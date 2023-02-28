import { checkData } from '../common/nullChecK';
import { tagsModel } from '../models/tagsModel';

export class TagService {
    
  //  Find Tag
  findTags = async (tagName:String, businessId:String) => {
    try {
      const tags = await tagsModel.findOne({ $and: [{ tag: tagName }, { businessId }] });
      return checkData(tags);
    } catch (error) {
      return error;
    }
  };

  //  All Tags
  allTags = async (businessId:String) => {
    try {
      const allTags = await tagsModel.find({ businessId });
      return checkData(allTags);
    } catch (error) {
      return error;
    }
  };

  //  Create Tag
  createTag = async (tagData:Object) => {
    try {
      const newTagsData = await tagsModel.create(tagData);
      // await tagCache.setCacheData(nullCheck.data.id, nullCheck.data);
      return checkData(newTagsData);
    } catch (error) {
      return error;
    }
  };

  //  Delete Tag
  deleteTag = async (_id:String) => {
    try {
      const data = await tagsModel.findByIdAndDelete(_id);
      return checkData(data);
    } catch (error) {
      return error;
    }
  };
}
