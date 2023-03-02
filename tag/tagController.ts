import { Request, Response } from 'express';
import { TagService } from './tagService';
import { StatusCode } from '../common/statusCodes';

export class TagController {

  constructor(public tagService: TagService,) {}

  //  Find Tags
  findTags = async (req: Request, res: Response) => {
    try {
      const businessId = res.locals.business;
      const tagName:any = req.query.tagName;
      const tagData = await this.tagService.findTags(tagName, businessId);
      return StatusCode.success(res, 200, tagData);
    } catch (error) {
      return error;
    }
  };

  //  All Tags
  allTags = async (req: Request, res: Response) => {
    try {
      const businessId = res.locals.business;
      const allTags = await this.tagService.allTags(businessId);
      return StatusCode.success(res, 200, allTags);
    } catch (error) {
      return error;
    }
  };

  //  Create Tags
  createTag = async (req: Request, res: Response) => {
    try {
      const businessId = res.locals.business;
      const { tagName } = req.body;
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
  deleteTag = async (req: Request, res: Response) => {
    try {
      const _id:any = req.query._id;
      const deletedTag = await this.tagService.deleteTag(_id);
      return StatusCode.success(res, 200, `Deleted Successfully ${deletedTag.tag}`);
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };
}
