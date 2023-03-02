import { Request, Response } from 'express';
import { templateSearch } from '../template/templateInterface';
export class FindTemplate {
  findTemplate = async (req: Request, res:Response): Promise<Object> => {
    const businessId: String = res.locals.business;
    const { templateId, search }: templateSearch = req.query;
    let condition: Object = {};
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
