import { TagService } from '../tag/tagService';

export class NumbersList {
  constructor(public tagService: TagService) {}
  listOfNumbers = async (searchTags: string, businessId: string):Promise<NumberListInterface|Error> => {
    try {
      const tagId = await this.tagService.findTags(searchTags, businessId) as TagModelInterface;
      let condition:NumberListInterface = {};
      if (searchTags) {
        condition = {
          $and: [{ businessId }, { tagId: tagId?._id }],
        };
      } else if (condition) {
        condition = { businessId };
      }
      return condition;
    } catch (error) {
      throw error as Error;
    }
  };
}
