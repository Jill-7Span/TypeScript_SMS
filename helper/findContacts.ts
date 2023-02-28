import { Tags } from '../tag/tagService';

const tags = new Tags();

export const listOfNumber = async (searchTags: String, businessId: String) => {
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
