import { Request, Response } from 'express';
import { genSalt, hash, compare } from 'bcrypt';
import { BusinessService } from './businessService';
import { Cache } from '../cache/cacheRequest';
import { statusError, statusSuccess } from '../common/statusCodes';
import { tokenJwt } from '../common/jwtCommon';
import { businessData, getBusinessList } from '../helper/businessList';
import { businessModel } from '../models/businessModel';

export class BusinessController {
  constructor(public cache: Cache, public businessService: BusinessService) {}

  // get business
  public businessDetails = async (req: Request, res: Response) => {
    try {
      const businessId: String = typeof req.query.id === 'string' ? req.query.id : '';
      const businessCacheData: string | null | undefined = await this.cache.getCacheData(businessId) as string | null | undefined;
      if (businessCacheData != null) {
        return statusSuccess(res, 200, JSON.parse(businessCacheData));
      } else {
        const existingBusiness = await this.businessService.getBusinessData({ _id: businessId });
        await this.cache.setCacheData(businessId, existingBusiness);
        return statusSuccess(res, 200, existingBusiness);
      }
    } catch (error: any) {
      return statusError(res, 500, error);
    }
  };

  // get Business
  public businessList = async (req: Request, res: Response) => {
    try {
      const { emailSearch, numberSearch, size, page } =  req.query;
      const condition = getBusinessList(emailSearch, numberSearch, size, page);
      const business = await this.businessService.getBusinessList(condition);
      return statusSuccess(res, 200, business);
    } catch (error) {
      return statusError(res, 500, error);
    }
  };

  //  Sign Up
  public businessSignUp = async (req: Request, res: Response) => {
    const bodyData:businessModel = req.body;
    try {
      const condition: Object = businessData(bodyData);
      const existingBusiness = await this.businessService.getBusinessData(condition);
      if (!existingBusiness) {
        if (bodyData.password === bodyData.confirmPassword) {
          const salt = await genSalt(10);
          bodyData.password = await hash(bodyData.password as string, salt);
          const newBusiness = await this.businessService.creteBusiness(bodyData);
          delete newBusiness.password;
          await this.cache.setCacheData(newBusiness._id, newBusiness);
          const token = tokenJwt(newBusiness);
          const newBusinessDetail = { ...newBusiness, token };
          return statusSuccess(res, 201, newBusinessDetail);
        } else {
          return statusError(res, 403, "Password Didn't Match");
        }
      } else {
        return statusError(res, 403, 'User Already Exits');
      }
    } catch (error) {
      return statusError(res, 500, error);
    }
  };

  // log in
  public businessLogIn = async (req: Request, res: Response) => {
    try {
      const { password, email }: Partial<businessModel> = req.body;
      const business = await this.businessService.getBusinessData({ email });
      if (!business) return statusError(res, 403, 'Invalid Details');

      const businessData = {
        firstName: business.firstName,
        lastName: business.lastName,
      };
      if (business) {
        const businessPassword = business.password;
        const passwordCompare = await compare(password as string, businessPassword);
        if (passwordCompare) {
          const token = tokenJwt(business);
          return statusSuccess(res, 200, { ...businessData, token });
        } else {
          return statusError(res, 401, 'Invalid Details');
        }
      } else {
        return statusError(res, 401, 'Invalid Details');
      }
    } catch (error) {
      return statusError(res, 500, error);
    }
  };

  // update Business
  public businessUpdate = async (req: Request, res: Response) => {
    try {
      const bodyData = req.body;
      const tokenId = req.business._id;
      const existingBusinessData = await this.businessService.getBusinessData({ _id: tokenId });
      let update: Partial<businessModel> = {};
      const condition = businessData(bodyData);
      const existingContactNumberOrEmail:any = await this.businessService.getBusinessList(condition);

      if (req.body.hasOwnProperty('contactNumber') || req.body.hasOwnProperty('email')) {
        if (existingContactNumberOrEmail.length == 0 || existingContactNumberOrEmail[0]._id === tokenId) {
          update.contactNumber = parseInt(bodyData.contactNumber);
          update.email = bodyData.email;
        } else {
          for (let i = 0; i < existingContactNumberOrEmail.length; i++) {
            const element = existingContactNumberOrEmail[i];
            if (element._id != tokenId && element.contactNumber === parseInt(bodyData.contactNumber)) {
              return statusError(res, 403, 'Number Already exits');
            }
            if (element._id != tokenId && element.email === bodyData.email) {
              return statusError(res, 403, 'Email Already exits');
            }
          }
        }
      }
      update.updatedAt = new Date();
      const updatedData = await this.businessService.updateBusiness(existingBusinessData._id, update);
      await this.cache.setCacheData(updatedData._id, updatedData);
      const token = tokenJwt(updatedData);
      return statusSuccess(res, 200, { ...updatedData, token });
    } catch (error) {
      return statusError(res, 500, error);
    }
  };

  // change password
  public businessPasswordChange = async (req: Request, res: Response) => {
    try {
      const email = req.business.email;
      const { oldPassword, newPassword, confirmPassword }: any = req.body;
      const update: Partial<businessModel> = {};
      if (newPassword === confirmPassword) {
        const business = await this.businessService.getBusinessData({ where: { email } });
        compare(oldPassword, business.password, async (error, data) => {
          if (error) {
            return statusError(res, 400, error);
          }
          if (data) {
            const salt = await genSalt(10);
            update.password = await hash(newPassword, salt);
            update.updatedAt = new Date();
            await this.businessService.updateBusiness(business._id, update);
            return update;
          } else {
            return statusError(res, 401, 'Incorrect Credentials');
          }
        });
      } else {
        return statusError(res, 401, 'Invalid Details');
      }
    } catch (error) {
      return statusError(res, 500, error);
    }
  };

  // delete Business
  public businessDelete = async (req: Request, res: Response) => {
    try {
      const _id = req.business._id;
      await this.businessService.deleteBusiness(_id);
      await this.cache.deleteCacheData(_id);
      return statusError(res, 200, 'Deleted');
    } catch (error) {
      return statusError(res, 500, error);
    }
  };
}
