const tagData = require("../tag/tagService")

exports.listOfNumber = async (searchTags, businessId) => {
    try {
        const tagId = await tagData.findTags(searchTags, businessId);
        let condition = {};
        if (searchTags) {
            condition = {
                $and: [
                    { businessId },
                    { tagId: tagId._id },
                ]
            };
        } else if (condition) {
            condition = { businessId };
        };
        return condition;
    } catch (error) {
        return error
    }
};