import nullCheck from "../common/nullChecK";
import tagsModel from "../models/tagsModel";

export class Tags {

    //  Find Tag
    findTags = async (tagName, businessId) => {
        try {
            const tags = await tagsModel.findOne({ $and: [{ tag: tagName }, { businessId }] });
            return nullCheck.data(tags);
        } catch (error) {
            return error;
        };
    };
    
    //  All Tags
    allTags = async (businessId) => {
        try {
            const allTags = await tagsModel.find({ businessId })
            return nullCheck.data(allTags);
        } catch (error) {
            return error
        }
    }
    
    //  Create Tag
    createTag = async (tagData) => {
        try {
            const newTagsData = await tagsModel.create(tagData);
            // await tagCache.setCacheData(nullCheck.data.id, nullCheck.data);
            return nullCheck.data(newTagsData);
        } catch (error) {
            return error;
        };
    };
    
    //  Delete Tag
    deleteTag = async (_id) => {
        try {
            const data = await tagsModel.findByIdAndDelete(_id);
            return nullCheck.data(data);
        } catch (error) {
            return error;
        };
    };
    
}
