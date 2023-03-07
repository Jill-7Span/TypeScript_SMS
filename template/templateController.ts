import Filter from 'bad-words';
import { Request, Response } from 'express';
import { TemplateService } from './templateService';
import { StatusCode } from '../common/statusCodes';
import { FindTemplate } from '../helper/findTemplate';

export class TemplateController {
  public filter = new Filter();
  public templateService: TemplateService;
  public findTemplate: FindTemplate;
  constructor(
  ) {
    this.templateService = new TemplateService();
    this.findTemplate = new FindTemplate();
  }
  //  Read Template
  public readTemplate = async (req: Request, res: Response) => {
    try {
      const condition = await this.findTemplate.findTemplate(req, res);
      const readTemplate = await this.templateService.readTemplate(condition);
      return StatusCode.success(res, 200, readTemplate);
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  //  Add Template
  public addTemplate = async (req: Request, res: Response) => {
    try {
      const { template, category } = req.body;
      const massage = this.filter.clean(template);
      const templateData = {
        category: category,
        template: massage,
        businessId: res.locals.business,
      };
      const createdTemplate = await this.templateService.addTemplate(templateData);
      return StatusCode.success(res, 201, createdTemplate);
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  //  Update Template
  public updateTemplate = async (req: Request, res: Response) => {
    try {
      const businessId = res.locals.business;
      const { _id, category, template }:any = req.query;
      const updatedAt:any = new Date();
      const updatedTemplate = await this.templateService.updateTemplate(_id, businessId, category, template, updatedAt);
      return StatusCode.success(res, 200, updatedTemplate);
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  //  Delete Template
  public deleteTemplate = async (req: Request, res: Response) => {
    try {
      const _id = req.query._id;
      const businessId = res.locals.business;
      let condition = {
        $and: [{ businessId }, { _id }],
      };
      await this.templateService.deleteTemplate(condition);
      return StatusCode.success(res, 200, 'Deleted Successfully');
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };
}
