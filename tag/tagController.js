const tagService = require("./tagService");
const status = require("../common/indexOfCommon");
const helper = require("../helper/indexOfHelper");


//  Find Tags
exports.findTags = async (req, res) => {
    try {
        const businessId = req.business._id;
        const tagName = req.query.tagName;
        const tagData = await tagService.findTags(tagName, businessId);
        return status.success(res, "200", tagData);
    } catch (error) {
        return error
    };
};

//  All Tags
exports.allTags = async (req, res) => {
    try {
        const businessId = req.business._id;
        const allTags = await tagService.allTags(businessId);
        return status.success(res, "200", allTags);
    } catch (error) {
        return error
    };
};

//  Create Tags
exports.createTag = async (req, res) => {
    try {
        const businessId = req.business._id;
        const {tagName} = req.body;
        const tagData = {
            tag:tagName,
            businessId:businessId
        }
        // const tagData = await helper.alreadyExistedTag(tagName, businessId);
        const newTag = await tagService.createTag(tagData);
        return status.success(res, "200", newTag);
    } catch (error) {
        return error
    };
};

//  Delete Tags
exports.deleteTag = async (req, res) => {
    try {
        const _id = req.query._id;
        const deletedTag = await tagService.deleteTag(_id);
        return status.success(res, "200", `Deleted Successfully ${deletedTag.tag}`)
    } catch (error) {
        return status.error(res, "500", error);
    };
};