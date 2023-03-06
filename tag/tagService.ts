import { CheckData } from '../common/nullChecK';
import { TagModel } from '../models/tagsModel';

export class TagService {
  //  Find Tag
  public findTags = async (tagName: string, businessId: string): Promise<TagData> => {
    try {
      const tags: TagModelInterface | null = await TagModel.findOne({ $and: [{ tag: tagName }, { businessId }] });
      return CheckData.nullCheck(tags);
    } catch (error) {
      return error as Error;
    }
  };

  //  All Tags
  public allTags = async (businessId: String): Promise<TagArrayInterface[] | null> => {
    try {
      const allTags: TagArrayInterface[] = await TagModel.find({ businessId });
      return CheckData.nullCheck(allTags);
    } catch (error) {
      throw error as Error;
    }
  };

  //  Create Tag
  public createTag = async (tagData: { tag: string; businessId: string }): Promise<TagModelInterface | null> => {
    try {
      const newTagsData: TagModelInterface = await TagModel.create(tagData);
      // await tagCache.setCacheData(CheckData.nullCheck.id, CheckData.nullCheck);
      return CheckData.nullCheck(newTagsData);
    } catch (error) {
      throw error as Error;;
    }
  };

  //  Delete Tag
  public deleteTag = async (_id: String) => {
    try {
      const data = await TagModel.findByIdAndDelete(_id);
      return CheckData.nullCheck(data);
    } catch (error) {
      throw error as Error;;
    }
  };
}
