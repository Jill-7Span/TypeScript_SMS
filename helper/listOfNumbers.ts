import { TagService } from '../tag/tagService';

const tags = new TagService();

export const listOfNumbers = async (searchTags: string, businessId: string) => {
  try {
    const tagId = await tags.findTags(searchTags, businessId);
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
