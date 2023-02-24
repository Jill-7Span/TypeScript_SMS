import {Tags} from "../tag/tagService";

export class TagChecker {
    public tags: Tags;

    constructor(){
        this.tags = new Tags();
    }

alreadyExistedTag = async (tagName, businessId) => {
    try {
        const existedTag = await this.tags.findTags(tagName, businessId);
        if (!existedTag) {
            const tag = {
                tag: tagName,
                businessId: businessId
            };
            return tag;
        } else {
            return "Already Existed Tag"
        }
    } catch (error) {
        return error;
    };
};

findTag = async (tagName, businessId) => {
    try {
        const existedTag = await this.tags.findTags(tagName, businessId);
        if (existedTag) {
            return existedTag;
        } else {
            return "Not Found Tag";
        }
    } catch (error) {
        return error;
    };
};
}
