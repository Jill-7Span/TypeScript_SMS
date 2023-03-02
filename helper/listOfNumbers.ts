import { TagService } from '../tag/tagService';

export class NumbersList {
  constructor(public tagService: TagService) {}
  listOfNumbers = async (searchTags: string, businessId: string) => {
    try {
      const tagId = await this.tagService.findTags(searchTags, businessId);
      let condition = {};
      if (searchTags) {
        condition = {
          $and: [{ businessId }, { tagId: tagId._id }],
        };
      } else if (condition) {
        condition = { businessId };
      }
      return condition;
    } catch (error) {
      return error;
    }
  };
}
