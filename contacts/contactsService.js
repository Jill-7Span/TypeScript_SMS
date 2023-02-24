const nullCheck = require("../common/indexOfCommon");
const contactsCache = require("../cache/cacheRequest");
const contactsModel = require("../models/contactsModel");


//  Find Contact
exports.findContact = async (_id) => {
    try {
        const data = await contactsModel.findOne({ _id });
        return nullCheck.data(data);
    } catch (error) {
        return error;
    };
};

//  List of Contact
exports.allContacts = async (condition) => {
    try {
        // .populate("businessId","-_id firstName lastName");  to populate business data
        const data = await contactsModel.find(condition).populate("tagId","-_id tag");
        return nullCheck.data(data);
    } catch (error) {
        return error;
    };
};

//  Upload CSV
exports.csvUpload = async (csvData) => {
    try {
        const newCsvData = await contactsModel.create(csvData);
        await contactsCache.setCacheData(nullCheck.data.id, nullCheck.data);
        return nullCheck.data(newCsvData);
    } catch (error) {
        return error;
    };
};

//  Update Contact Tags
exports.updateContactTags = async (_id, tagsId) => {
    try {
        const updatedContact = await contactsModel.updateMany(
            { _id: { $in: _id } },
            { $set:{tagId: tagsId}}
        );
        // await contactsCache.setCacheData(nullCheck.data.id, nullCheck.data);
        return nullCheck.data(updatedContact);
    } catch (error) {
        return error;
    };
};

//  Update Contact
exports.updateContact = async (businessId, bodyData, updatedAt) => {
    try {
        const updatedContact = await contactsModel.findOneAndUpdate({ $and: [{ _id: bodyData._id }, { business: businessId }] }, {
            $set: { bodyData, updatedAt }
        },
            { new: true });
        // await contactsCache.setCacheData(nullCheck.data.id, nullCheck.data);
        return nullCheck.data(updatedContact);
    } catch (error) {
        return error;
    };
};

//  Delete Contact
exports.deleteContact = async (_id) => {
    try {
        const data = await contactsModel.findByIdAndDelete(_id);
        return nullCheck.data(data);
    } catch (error) {
        return error;
    };
};

