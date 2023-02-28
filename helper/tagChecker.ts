import { Tags } from '../tag/tagService';

const tags = new Tags();

export const alreadyExistedTag = async (tagName: String, businessId: String) => {
  try {
    const existedTag = await tags.findTags(tagName, businessId);
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

export const findTag = async (tagName: String, businessId: String) => {
  try {
    const existedTag = await tags.findTags(tagName, businessId);
    if (existedTag) {
      return existedTag;
    } else {
      return 'Not Found Tag';
    }
  } catch (error) {
    return error;
  }
};
