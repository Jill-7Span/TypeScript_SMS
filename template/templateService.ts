import { Cache } from '../cache/cacheRequest';
import { TemplatesModel } from '../models/templateModule';
import { CheckData } from '../common/nullChecK';
import { TemplateData, TemplateModelInterface } from './templateInterface';

export class TemplateService {
  public cache: Cache;
  constructor() {
    this.cache = new Cache();
  }

  //  Read Template
  public readTemplate = async (condition: any):Promise<TemplateData> => {
    try {
      const readTemplate:Partial<TemplateModelInterface>|null = await TemplatesModel.find(condition).populate('businessId', '_id ');
      return CheckData.nullCheck(readTemplate);
    } catch (error) {
      throw error as Error;;
    }
  };

  //  Add Template
  public addTemplate = async (templateData: any) => {
    try {
      const addedTemplate = await TemplatesModel.create(templateData);
      await this.cache.setCacheData(addedTemplate.data.id, addedTemplate.data);
      return CheckData.nullCheck(addedTemplate);
    } catch (error) {
      throw error as Error;;
    }
  };

  //  Update Template
  public updateTemplate = async (_id: String, businessId: String, category: String, template: String, updatedAt: String) => {
    try {
      const data = await TemplatesModel.findOneAndUpdate(
        { $and: [{ _id }, { businessId }] },
        { $set: { category, template, updatedAt } },
        { new: true }
      ); // new : true for send updated data
      return CheckData.nullCheck(data);
    } catch (error) {
      throw error as Error;;
    }
  };

  //  Delete Template
  public deleteTemplate = async (condition: any) => {
    try {
      const data = await TemplatesModel.deleteOne(condition);
      return CheckData.nullCheck(data);
    } catch (error) {
      throw error as Error;;
    }
  };
}
