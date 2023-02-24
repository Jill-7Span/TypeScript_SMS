import nullCheck from "../common/indexOfCommon";
// import businessCache from "../cache/cacheRequest";
import businessModel from "../models/businessModel";

export class BusinessService {
    
    //get business
    getBusinessData = async (condition:any) => {
        try {
            const data = await businessModel.findOne(condition).select("+password");       
            // .select is use to set password when in schema its select false`
            return nullCheck.data(data);
        } catch (error) {
            return error;   
        };
    };
    
    // get Business
    getBusinessList = async (condition:any) => {
        try {
            const data = await businessModel.find(condition);
            return data;
        } catch (error) {
            return error;
        };
    };
    
    // sign up Business
    creteBusiness = async (data:any) => {
        try {
            const newBusinessData = await businessModel.create(data);
            // await businessCache.setCacheData(newBusinessData.dataValues._id, newBusinessData.dataValues);
            return nullCheck.data(newBusinessData);
        } catch (error) {
            return error;
        };
    };
    
    // update Business
    updateBusiness = async (_id:any, update:any) => {
        try {
            const data = await businessModel.findOneAndUpdate({ _id }, { $set: update }, { returnDocument: 'after' });
            // await businessCache.setCacheData(data.dataValues._id, data.dataValues);
            return nullCheck.data(data);
        } catch (error) {
            return error;
        };
    };
    
    // delete Business
    deleteBusiness = async (_id:any) => {
        try {
            return await businessModel.deleteOne({ _id });
        } catch (error) {
            return error;
        };
    };

}
