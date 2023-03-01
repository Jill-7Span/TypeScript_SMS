import Filter from 'bad-words';
import { Request, Response } from 'express';
import { TemplateService } from './templateService';
import { statusError, statusSuccess } from '../common/statusCodes';
import { findTemplate } from '../helper/findTemplate';

export class TemplateController {
  public filter = new Filter();
  public templateService: TemplateService;

  constructor() {
    this.templateService = new TemplateService();
  }
  //  Read Template
  readTemplate = async (req: Request, res: Response) => {
    try {
      const condition = await findTemplate(req);
      const readTemplate = await this.templateService.readTemplate(condition);
      return statusSuccess(res, 200, readTemplate);
    } catch (error) {
      return statusError(res, 500, error);
    }
  };

  //  Add Template
  addTemplate = async (req: Request, res: Response) => {
    try {
      const { template, category } = req.body;
      const massage = this.filter.clean(template);
      const templateData = {
        category: category,
        template: massage,
        businessId: req.business._id,
      };
      const createdTemplate = await this.templateService.addTemplate(templateData);
      return statusSuccess(res, 201, createdTemplate);
    } catch (error) {
      return statusError(res, 500, error);
    }
  };

  //  Update Template
  updateTemplate = async (req: Request, res: Response) => {
    try {
      const businessId = req.business._id;
      const { _id, category, template } = req.query;
      const updatedAt = new Date();
      const updatedTemplate = await this.templateService.updateTemplate(_id, businessId, category, template, updatedAt);
      return statusSuccess(res, 200, updatedTemplate);
    } catch (error) {
      return statusError(res, 500, error);
    }
  };

  //  Delete Template
  deleteTemplate = async (req: Request, res: Response) => {
    try {
      const _id = req.query._id;
      const businessId = req.business._id;
      let condition = {
        $and: [{ businessId }, { _id }],
      };
      await this.templateService.deleteTemplate(condition);
      return statusSuccess(res, 200, 'Deleted Successfully');
    } catch (error) {
      return statusError(res, 500, error);
    }
  };
}
