import { Request, Response } from 'express';
import { TagService } from './tagService';
import { StatusCode } from '../common/statusCodes';

export class TagController {
  public tagService: TagService
  constructor() {
    this.tagService = new TagService();
  }

  //  Find Tags
  public findTags = async (req: Request, res: Response) => {
    try {
      const businessId: string = res.locals.business._id;
      const tagName: string = req.query.tagName as string;
      const tagData = await this.tagService.findTags(tagName, businessId);
      return StatusCode.success(res, 200, tagData);
    } catch (error) {
      return error;
    }
  };

  //  All Tags
  public allTags = async (req: Request, res: Response) => {
    try {
      const businessId: string = res.locals.business._id as string;
      const allTags = await this.tagService.allTags(businessId);
      return StatusCode.success(res, 200, allTags);
    } catch (error) {
      return error;
    }
  };

  //  Create Tags
  public createTag = async (req: Request, res: Response) => {
    try {
      const businessId: string = res.locals.business._id;
      const tagName: string = req.body;
      const tagData = {
        tag: tagName,
        businessId: businessId,
      };
      // const tagData = await helper.alreadyExistedTag(tagName, businessId);
      const newTag = await this.tagService.createTag(tagData);
      return StatusCode.success(res, 200, newTag);
    } catch (error) {
      return error;
    }
  };

  //  Delete Tags
  public deleteTag = async (req: Request, res: Response) => {
    try {
      const _id: string = req.query._id as string;
      const deletedTag:any = await this.tagService.deleteTag(_id);
      return StatusCode.success(res, 200, `Deleted Successfully ${deletedTag.tag}`);
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };
}
