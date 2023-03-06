import { CheckData } from '../common/nullChecK';
import { BusinessModel } from '../models/businessModel';

export class BusinessService {
  //get business
  public getBusinessData = async (condition: object): Promise<BusinessModelInterface | null> => {
    try {
      const data: BusinessModelInterface | null = await BusinessModel.findOne(condition).select('+password');
      // .select is use to set password when in schema its select false`
      return CheckData.nullCheck<BusinessModelInterface>(data);
    } catch (error) {
      throw error as Error;;
    }
  };

  // get Business
  public searchInBusiness = async (condition:ListOfBusiness): Promise<B_Array[]> => {
    try {
      const data: B_Array[] = await BusinessModel.find(condition);
      return data;
    } catch (error) {
      throw error as Error;;
    }
  };

  // sign up Business
  public creteBusiness = async (data: BusinessModelInterface): Promise<BusinessModelInterface> => {
    try {
      const newBusinessData: BusinessModelInterface = await BusinessModel.create(data);
      return CheckData.nullCheck(newBusinessData) as BusinessModelInterface;
    } catch (error) {
      throw error as Error;;
    }
  };

  // update Business
  public updateBusiness = async (_id: string, update: any): Promise<BusinessModelInterface | null> => {
    try {
      const data: BusinessModelInterface | null = await BusinessModel.findOneAndUpdate(
        { _id },
        { $set: update },
        { returnDocument: 'after' }
      );
      return CheckData.nullCheck(data) as BusinessModelInterface;
    } catch (error) {
      throw error as Error;;
    }
  };

  // delete Business
  public deleteBusiness = async (_id: string): Promise<any> => {
    try {
      return await BusinessModel.deleteOne({ _id });
    } catch (error) {
      throw error as Error;;
    }
  };
}
