import { TagService } from '../tag/tagService';

export class TagChecker {
  static tagService: TagService;
  constructor(public tagService: TagService) {}

  public static alreadyExistedTag = async (tagName: string, businessId: string) => {
    try {
      const existedTag = await this.tagService.findTags(tagName, businessId);
      if (!existedTag) {
        const tag = {
          tag: tagName,
          businessId: businessId,
        };
        return tag;
      } else {
        return 'Already Existed Tag';
      }
    } catch (error) {
      throw error as Error;
    }
  };

  public static findTag = async (tagName: string, businessId: string) => {
    try {
      const existedTag = await this.tagService.findTags(tagName, businessId);
      if (existedTag) {
        return existedTag;
      } else {
        return 'Not Found Tag';
      }
    } catch (error) {
      throw error as Error;
    }
  };
}
