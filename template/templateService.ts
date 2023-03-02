import { Cache } from '../cache/cacheRequest';
import { TemplatesModel } from '../models/templateModule';
import { CheckData } from '../common/nullChecK';

export class TemplateService {

  constructor( public cache: Cache,) {}

  //  Read Template
  readTemplate = async (condition: any) => {
    try {
      const readTemplate = await TemplatesModel.find(condition).populate('businessId', '_id ');
      await this.cache.setCacheData(readTemplate.data.id, readTemplate.data);
      return CheckData.nullCheck(readTemplate);
    } catch (error) {
      return error;
    }
  };

  //  Add Template
  addTemplate = async (templateData: any) => {
    try {
      const addedTemplate = await TemplatesModel.create(templateData);
      await this.cache.setCacheData(addedTemplate.data.id, addedTemplate.data);
      return CheckData.nullCheck(addedTemplate);
    } catch (error) {
      return error;
    }
  };

  //  Update Template
  updateTemplate = async (_id: String, businessId: String, category: String, template: String, updatedAt: String) => {
    try {
      const data = await TemplatesModel.findOneAndUpdate(
        { $and: [{ _id }, { businessId }] },
        { $set: { category, template, updatedAt } },
        { new: true }
      ); // new : true for send updated data
      return CheckData.nullCheck(data);
    } catch (error) {
      return error;
    }
  };

  //  Delete Template
  deleteTemplate = async (condition: any) => {
    try {
      const data = await TemplatesModel.deleteOne(condition);
      return CheckData.nullCheck(data);
    } catch (error) {
      return error;
    }
  };
}
