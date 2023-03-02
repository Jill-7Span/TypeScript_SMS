import { TagService } from '../tag/tagService';

export class TagChecker {
  static tagService: any;

  constructor(public tagService: TagService) {}

  public static alreadyExistedTag = async (tagName: String, businessId: String) => {
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
      return error;
    }
  };

  public static findTag = async (tagName: String, businessId: String) => {
    try {
      const existedTag = await this.tagService.findTags(tagName, businessId);
      if (existedTag) {
        return existedTag;
      } else {
        return 'Not Found Tag';
      }
    } catch (error) {
      return error;
    }
  };
}
