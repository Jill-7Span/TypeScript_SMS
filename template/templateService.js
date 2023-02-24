const nullCheck = require("../common/indexOfCommon");
const businessCache = require("../cache/cacheRequest");
const templateModel = require("../models/templateModule");


//  Read Template
exports.readTemplate = async (condition) => {
    try {
        const readTemplate = await templateModel.find(condition).populate("businessId", "_id ");
        await businessCache.setCacheData(nullCheck.data.id, nullCheck.data);
        return nullCheck.data(readTemplate);
    } catch (error) {
        return error;
    };
};

//  Add Template
exports.addTemplate = async (templateData) => {
    try {
        const addedTemplate = await templateModel.create(templateData);
        await businessCache.setCacheData(nullCheck.data.id, nullCheck.data);
        return nullCheck.data(addedTemplate);
    } catch (error) {
        return error;
    };
};

//  Update Template
exports.updateTemplate = async (_id, businessId, category, template, updatedAt) => {
    try {
        const data = await templateModel.findOneAndUpdate({
            $and: [{ _id }, { businessId }]
        }, {
            $set: { category, template, updatedAt }
        }, { new: true });     // new : true for send updated data
        return nullCheck.data(data);
    } catch (error) {
        return error;
    };
};

//  Delete Template
exports.deleteTemplate = async (condition) => {
    try {
        const data = await templateModel.deleteOne(condition);
        return nullCheck.data(data);
    } catch (error) {
        return error;
    };
};
