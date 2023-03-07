import { Request, Response } from 'express';
import { templateSearch } from '../template/templateInterface';
import { FindTemplateInterface } from './helperInterface';
export class FindTemplate {
  findTemplate = async (req: Request, res:Response):Promise<FindTemplateInterface>=> {
    const businessId : string = res.locals.business._id;
    const { templateId, search }: templateSearch = req.query;
    let condition:FindTemplateInterface = {};
    if (search) {
      condition = {
        $and: [
          {
            $or: [{ template: { $regex: search } }, { category: { $regex: search } }],
          },
          { businessId },
        ],
      };
    } else if (templateId) {
      condition = {
        $and: [{ _id: templateId }, { businessId }],
      };
    }
    return condition;
  };
}
