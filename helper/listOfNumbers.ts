import { TagModelInterface } from '../tag/tagInterface';
import { TagService } from '../tag/tagService';
import { NumberListInterface } from './helperInterface';

export class NumbersList {
  public tagService: TagService;
  constructor() {
    this.tagService = new TagService();
  }
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
