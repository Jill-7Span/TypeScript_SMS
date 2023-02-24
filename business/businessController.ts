import { genSalt, hash, compare } from "bcrypt";
import { BusinessService } from "./businessService";
import { Cache } from "../cache/cacheRequest";
import { tokenJwt } from "../common/jwtCommon";
import { StatusCode } from "../common/statusCodes";
import { csvToJson, TagChecker, BusinessList } from "../helper/indexOfHelper";

export class BusinessController {
  public cache: Cache;
  public statusCode: StatusCode;
  public businessService: BusinessService;

  constructor() {
    this.cache = new Cache();
    this.statusCode = new StatusCode();
    this.businessService = new BusinessService();
  }

  // get business
  public businessDetails = async (req: Request, res: Response) => {
    try {
      const businessId = req.query.id;
      const businessCacheData = await this.cache.getCacheData(businessId);
      if (businessCacheData != null) {
        return res.json(JSON.parse(businessCacheData));
      } else {
        const existingBusiness = await this.businessService.getBusinessData({
          _id: businessId,
        });
        await this.cache.setCacheData(businessId, existingBusiness);
        return this.statusCode.success(res, "200", existingBusiness);
      }
    } catch (error) {
      return this.statusCode.error(res, "500", error);
    }
  };

  // get Business
  public businessList = async (req: Request, res: Response) => {
    try {
      const { emailSearch, numberSearch, size, page } = req.query;
      const condition = this.indexOfHelper.businessList.getBusinessList(emailSearch, numberSearch, size, page);
      const business = await this.businessService.getBusinessList(condition);
      return this.statusCode.success(res, "200", business);
    } catch (error) {
      return this.statusCode.error(res, "500", error);
    }
  };

  //  Sign Up
  public businessSignUp = async (req: Request, res: Response) => {
    const bodyData: any = req.body;
    try {
      const condition = _businessData(bodyData);
      const existingBusiness = await this.businessService.getBusinessData(
        condition
      );
      if (!existingBusiness) {
        if (bodyData.password === bodyData.confirmPassword) {
          const salt = await genSalt(10);
          bodyData.password = await hash(bodyData.password, salt);
          const newBusiness = await this.businessService.creteBusiness(
            bodyData
          );
          delete newBusiness.password;
          await this.cache.setCacheData(newBusiness._id, newBusiness);
          const token = tokenJwt(newBusiness);
          const newBusinessDetail = { ...newBusiness, token };
          return this.statusCode.success(res, "201", newBusinessDetail);
        } else {
          return this.statusCode.error(res, "403", "Password Didn't Match");
        }
      } else {
        return this.statusCode.error(res, "403", "User Already Exits");
      }
    } catch (error) {
      return this.statusCode.error(res, "500", error);
    }
  };

  // log in
  public businessLogIn = async (req: Request, res: Response) => {
    try {
      const { password, email }: any = req.body;
      const business = await this.businessService.getBusinessData({ email });
      if (!business)
        return this.statusCode.error(res, "403", "Invalid Details");

      const businessData = {
        firstName: business.firstName,
        lastName: business.lastName,
      };
      if (business) {
        const businessPassword = business.password;
        const passwordCompare = await compare(password, businessPassword);
        if (passwordCompare) {
          const token = tokenJwt(business);
          return this.statusCode.success(res, "200", {
            ...businessData,
            token,
          });
        } else {
          return this.statusCode.error(res, "401", "Invalid Details");
        }
      } else {
        return this.statusCode.error(res, "401", "Invalid Details");
      }
    } catch (error) {
      return this.statusCode.error(res, "500", error);
    }
  };

  // update Business
  public businessUpdate = async (req: Request, res: Response) => {
    try {
      const bodyData = req.body;
      const tokenId = req.business._id;
      const existingBusinessData = await this.businessService.getBusinessData({
        _id: tokenId,
      });
      let update = {};
      const condition = _businessData(bodyData);
      const existingContactNumberOrEmail =
        await this.businessService.getBusinessList(condition);

      if (
        req.body.hasOwnProperty("contactNumber") ||
        req.body.hasOwnProperty("email")
      ) {
        if (
          existingContactNumberOrEmail.length == 0 ||
          existingContactNumberOrEmail[0]._id === tokenId
        ) {
          update.contactNumber = parseInt(body.contactNumber);
          update.email = body.email;
        } else {
          for (let i = 0; i < existingContactNumberOrEmail.length; i++) {
            const element = existingContactNumberOrEmail[i];
            if (
              element._id != tokenId &&
              element.contactNumber === parseInt(body.contactNumber)
            ) {
              return this.statusCode.error(res, "403", "Number Already exits");
            }
            if (element._id != tokenId && element.email === body.email) {
              return this.statusCode.error(res, "403", "Email Already exits");
            }
          }
        }
      }
      update.updatedAt = new Date();
      const updatedData = await this.businessService.updateBusiness(
        existingBusinessData._id,
        update
      );
      await this.cache.setCacheData(updatedData._id, updatedData);
      const token = tokenJwt(updatedData);
      return this.statusCode.success(res, "200", { ...updatedData, token });
    } catch (error) {
      return this.statusCode.error(res, "500", error);
    }
  };

  // change password
  public businessPasswordChange = async (req: Request, res: Response) => {
    try {
      const email = req.business.email;
      const { oldPassword, newPassword, confirmPassword }: any = req.body;
      const update = {};
      if (newPassword === confirmPassword) {
        const business = await this.businessService.getBusinessData({
          where: { email },
        });
        compare(oldPassword, business.password, async (error, data) => {
          if (error) {
            return this.statusCode.error(res, "400", error);
          }
          if (data) {
            const salt = await genSalt(10);
            update.password = await hash(newPassword, salt);
            update.updated_at = new Date();
            await this.businessService.updateBusiness(business._id, update);
            return updated;
          } else {
            return this.statusCode.error(res, "401", "Incorrect Credentials");
          }
        });
      } else {
        return this.statusCode.error(res, "401", "Invalid Details");
      }
    } catch (error) {
      return this.statusCode.error(res, "500", error);
    }
  };

  // delete Business
  public businessDelete = async (req: Request, res: Response) => {
    try {
      const _id = req.business._id;
      await this.businessService.deleteBusiness(_id);
      await this.cache.deleteCacheData(_id);
      return this.statusCode.error(res, "200", "Deleted");
    } catch (error) {
      return this.statusCode.error(res, "500", error);
    }
  };
}
