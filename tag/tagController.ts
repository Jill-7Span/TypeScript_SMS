import { Request, Response } from 'express';
import { TagService } from './tagService';
import { statusError, statusSuccess } from '../common/statusCodes';

export class TagController {
  public tagService: TagService;

  constructor() {
    this.tagService = new TagService();
  }

  //  Find Tags
  findTags = async (req: Request, res: Response) => {
    try {
      const businessId = req.business._id;
      const tagName:any = req.query.tagName;
      const tagData = await this.tagService.findTags(tagName, businessId);
      return statusSuccess(res, 200, tagData);
    } catch (error) {
      return error;
    }
  };

  //  All Tags
  allTags = async (req: Request, res: Response) => {
    try {
      const businessId = req.business._id;
      const allTags = await this.tagService.allTags(businessId);
      return statusSuccess(res, 200, allTags);
    } catch (error) {
      return error;
    }
  };

  //  Create Tags
  createTag = async (req: Request, res: Response) => {
    try {
      const businessId = req.business._id;
      const { tagName } = req.body;
      const tagData = {
        tag: tagName,
        businessId: businessId,
      };
      // const tagData = await helper.alreadyExistedTag(tagName, businessId);
      const newTag = await this.tagService.createTag(tagData);
      return statusSuccess(res, 200, newTag);
    } catch (error) {
      return error;
    }
  };

  //  Delete Tags
  deleteTag = async (req: Request, res: Response) => {
    try {
      const _id:any = req.query._id;
      const deletedTag = await this.tagService.deleteTag(_id);
      return statusSuccess(res, 200, `Deleted Successfully ${deletedTag.tag}`);
    } catch (error) {
      return statusError(res, 500, error);
    }
  };
}
