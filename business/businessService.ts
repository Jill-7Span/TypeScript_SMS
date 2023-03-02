import { CheckData } from '../common/nullChecK';
import { businessModel } from '../interface/interface';
import { BusinessModel } from '../models/businessModel';

export class BusinessService {
  //get business
  getBusinessData = async (condition: object): Promise<businessModel | null | Error> => {
    try {
      const data: businessModel | null = await BusinessModel.findOne(condition).select('+password');
      // .select is use to set password when in schema its select false`
      return CheckData.CheckData.nullCheck) as businessModel;
    } catch (error) {
      return error as Error;
    }
  };

  // get Business
  searchInBusiness = async (condition: any): Promise<businessModel[] | Error> => {
    try {
      const data: businessModel[] = await BusinessModel.find(condition);
      return data;
    } catch (error) {
      return error as Error;
    }
  };

  // sign up Business
  creteBusiness = async (data: businessModel): Promise<businessModel | Error> => {
    try {
      const newBusinessData: businessModel = await BusinessModel.create(data);
      return CheckData.nullCheck(newBusinessData) as businessModel;
    } catch (error) {
      return error as Error;
    }
  };

  // update Business
  updateBusiness = async (_id: string, update: any):Promise<businessModel|null|Error> => {
    try {
      const data:businessModel|null = await BusinessModel.findOneAndUpdate({ _id }, { $set: update }, { returnDocument: 'after' });
      return CheckData.CheckData.nullCheck) as businessModel | null;
    } catch (error) {
      return error as Error;
    }
  };

  // delete Business
  deleteBusiness = async (_id: string):Promise<any> => {
    try {
      return await BusinessModel.deleteOne({ _id });
    } catch (error) {
      return error as Error;
    }
  };
}
