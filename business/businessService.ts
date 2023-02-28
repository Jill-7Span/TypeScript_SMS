import { checkData } from '../common/nullChecK';
// import businessCache from "../cache/cacheRequest";
import { BusinessModel } from '../models/businessModel';

export class BusinessService {
  //get business
  getBusinessData = async (condition: Object) => {
    try {
      const data = await BusinessModel.findOne(condition).select('+password');
      // .select is use to set password when in schema its select false`
      return checkData(data);
    } catch (error) {
      return error;
    }
  };

  // get Business
  getBusinessList = async (condition: any) => {
    try {
      const data = await BusinessModel.find(condition);
      return data;
    } catch (error) {
      return error;
    }
  };

  // sign up Business
  creteBusiness = async (data: any) => {
    try {
      const newBusinessData = await BusinessModel.create(data);
      // await businessCache.setCacheData(newBusinessData.dataValues._id, newBusinessData.dataValues);
      return checkData(newBusinessData);
    } catch (error) {
      return error;
    }
  };

  // update Business
  updateBusiness = async (_id: any, update: any) => {
    try {
      const data = await BusinessModel.findOneAndUpdate({ _id }, { $set: update }, { returnDocument: 'after' });
      // await businessCache.setCacheData(data.dataValues._id, data.dataValues);
      return checkData(data);
    } catch (error) {
      return error;
    }
  };

  // delete Business
  deleteBusiness = async (_id: any) => {
    try {
      return await BusinessModel.deleteOne({ _id });
    } catch (error) {
      return error;
    }
  };
}
