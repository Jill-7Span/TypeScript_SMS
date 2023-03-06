import { Request, Response } from 'express';
import { genSalt, hash, compare } from 'bcrypt';
import { BusinessService} from './businessService';
import { Cache } from '../cache/cacheRequest';
import { StatusCode } from '../common/statusCodes';
import { TokenJwt } from '../common/jwtCommon';
import { BusinessList } from '../helper/businessList';
import { changePassword, searchQuery } from '../interface/interface';

export class BusinessController {
  constructor(public cache: Cache, public businessService: BusinessService, public jwt: TokenJwt) {}

  // get business
  public businessDetails = async (req: Request, res: Response) => {
    try {
      // const businessId: String = typeof req.query.id === 'string' ? req.query.id : '';
      const businessId = req.query.id as string;

      const businessCacheData = await this.cache.getCacheData(businessId);

      if (businessCacheData != null) {
        return StatusCode.success(res, 200, JSON.parse(businessCacheData as string));
      } else {
        const existingBusiness: object | null = await this.businessService.getBusinessData({ _id: businessId });
        await this.cache.setCacheData(businessId, existingBusiness as Object);
        return StatusCode.success(res, 200, existingBusiness);
      }
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  // get Business
  public businessList = async (req: Request, res: Response) => {
    try {
      const { emailSearch, numberSearch, size, page }: searchQuery = req.query;
      const condition = BusinessList.searchInBusiness(emailSearch, numberSearch, size, page);
      const business = await this.businessService.searchInBusiness(condition);
      return StatusCode.success(res, 200, business);
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  //  Sign Up
  public businessSignUp = async (req: Request, res: Response) => {
    const bodyData: BusinessModelInterface = req.body;
    try {
      const condition = BusinessList.listOfBusiness(bodyData.email, bodyData.contactNumber as string);
      const existingBusiness = await this.businessService.getBusinessData(condition);
      if (!existingBusiness) {
        if (bodyData.password === bodyData.confirmPassword) {
          const salt = await genSalt(10);
          bodyData.password = await hash(bodyData.password as string, salt);
          const newBusiness: BusinessModelInterface = (await this.businessService.creteBusiness(bodyData)) as BusinessModelInterface;
          delete newBusiness.password;
          await this.cache.setCacheData(newBusiness._id as string, newBusiness);
          const token = this.jwt.token(newBusiness);
          const newBusinessDetail = { ...newBusiness, token };
          return StatusCode.success(res, 201, newBusinessDetail);
        } else {
          return StatusCode.error(res, 403, "Password Didn't Match");
        }
      } else {
        return StatusCode.error(res, 403, 'User Already Exits');
      }
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  // log in
  public businessLogIn = async (req: Request, res: Response) => {
    try {
      const { email, password }: logIn = req.body;
      const business = (await this.businessService.getBusinessData({ email })) as BusinessModelInterface;
      if (!business) return StatusCode.error(res, 403, 'Invalid Details');

      const nameOfBusiness: nameOfBusiness = {
        firstName: business.firstName,
        lastName: business.lastName,
      };
      if (business) {
        const businessPassword = business.password as string;
        const passwordCompare = await compare(password as string, businessPassword);
        if (passwordCompare) {
          const token = this.jwt.token(business);
          return StatusCode.success(res, 200, { ...nameOfBusiness, token });
        } else {
          return StatusCode.error(res, 401, 'Invalid Details');
        }
      } else {
        return StatusCode.error(res, 401, 'Invalid Details');
      }
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  // update Business
  public businessUpdate = async (req: Request, res: Response) => {
    try {
      const bodyData: Partial<businessModel> = req.body;
      const tokenId = res.locals.business._id;
      const existingBusinessData = (await this.businessService.getBusinessData({ _id: tokenId })) as BusinessModelInterface;
      let update: Partial<businessModel> = {};
      const condition = BusinessList.listOfBusiness(bodyData.email as string, bodyData.contactNumber as string);
      const existingContactNumberOrEmail = (await this.businessService.searchInBusiness(
        condition as ListOfBusiness
      )) as unknown as BusinessModelInterface[];
      if (existingContactNumberOrEmail != null) {
        if (req.body.hasOwnProperty('contactNumber') || req.body.hasOwnProperty('email')) {
          if (existingContactNumberOrEmail.length == 0 || existingContactNumberOrEmail[0]?._id === tokenId) {
            update.contactNumber = parseInt(bodyData.contactNumber as string);
            update.email = bodyData.email;
          } else {
            for (let i = 0; i < existingContactNumberOrEmail.length; i++) {
              const element = existingContactNumberOrEmail[i];
              if (element._id != tokenId && element.contactNumber === parseInt(bodyData.contactNumber as string)) {
                return StatusCode.error(res, 403, 'Number Already exits');
              }
              if (element._id != tokenId && element.email === bodyData.email) {
                return StatusCode.error(res, 403, 'Email Already exits');
              }
            }
          }
        }
      }

      update.updatedAt = new Date();
      const updatedData = (await this.businessService.updateBusiness(
        existingBusinessData._id,
        update
      )) as BusinessModelInterface;
      await this.cache.setCacheData(updatedData._id, updatedData);
      const token = this.jwt.token(updatedData);
      return StatusCode.success(res, 200, { ...updatedData, token });
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  // change password
  public businessPasswordChange = async (req: Request, res: Response) => {
    try {
      const email: string = res.locals.business.email;
      const { oldPassword, newPassword, confirmPassword }: changePassword = req.body;
      const update: Partial<businessModel> = {};
      if (newPassword === confirmPassword) {
        const business: C = await this.businessService.getBusinessData({ where: { email } });

        if (business && business.password) {
          compare(oldPassword, business.password, async (error, data) => {
            if (error) {
              return StatusCode.error(res, 400, error);
            } else if (business && business?._id) {
              const salt = await genSalt(10);
              update.password = await hash(newPassword, salt);
              update.updatedAt = new Date();
              await this.businessService.updateBusiness(business._id.toString(), update);
              return update;
            } else {
              return StatusCode.error(res, 401, 'Incorrect Credentials');
            }
          });
        }
      } else {
        return StatusCode.error(res, 401, 'Invalid Details');
      }
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  // delete Business
  public businessDelete = async (req: Request, res: Response) => {
    try {
      const _id: string = res.locals.business;
      await this.businessService.deleteBusiness(_id);
      await this.cache.deleteCacheData(_id);
      return StatusCode.error(res, 200, 'Deleted');
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };
}
