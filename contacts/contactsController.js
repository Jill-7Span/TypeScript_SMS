const contactsService = require("./contactsService");
const tags = require("../tag/tagService");
const status = require("../common/indexOfCommon");
const allContact = require("../common/findContacts");
const helper = require("../helper/indexOfHelper");
const contactCache = require("../cache/cacheRequest");


//  Find Contact
exports.findContact = async (req, res) => {
    try {
        const _id = req.body._id;
        const cachedContact = await contactCache.getCacheData(_id);
        if (cachedContact !== null) {
            return status.success(res, "200", JSON.parse(cachedContact));
        } else {
            const contact = await contactsService.findContact(_id);
            await contactCache.setCacheData(_id,contact)
            return status.success(res, "200", contact);
        }
    } catch (error) {
        return status.error(res, "500", error);
    };
};

//  List Of Contacts
exports.allContacts = async (req, res) => {
    try {
        const businessId = req.business._id;
        const { searchTags } = req.query;
        const condition = await allContact.listOfNumber(searchTags, businessId);
        const allContacts = await contactsService.allContacts(condition);
        return status.success(res, "200", allContacts)
    } catch (error) {
        return status.error(res, "500", error);
    };
};

//  CSV Upload
exports.csvUpload = async (req, res) => {
    try {
        const csvData = await helper.csvToJson(req, res);
        const csv = await contactsService.csvUpload(csvData);
        return status.success(res, "201", csv);
    } catch (error) {
        return status.error(res, "500", error);
    };
};


// Update Contact
exports.updateContact = async (req, res) => {
    try {
        const businessId = req.business._id;
        const bodyData = req.body;
        const updatedAt = new Date();
        const updatedContact = await contactsService.updateContact(businessId, bodyData, updatedAt);
        await contactCache.setCacheData(updatedContact._id, updatedContact)
        return status.success(res, updatedContact);
    } catch (error) {
        return status.error(res, "500", error);
    };
};

// Update Contact Tags
exports.updateContactTags = async (req, res) => {
    try {
        const businessId = req.business._id;
        const { _id, tagName } = req.body;
        const tag = await tags.findTags(tagName, businessId);
        const updatedTag = await contactsService.updateContactTags(_id, tag.tagName);
        return status.success(res, "200", updatedTag);
    } catch (error) {
        return status.error(res, "500", error);
    };
};

// Delete Contact
exports.deleteContact = async (req, res) => {
    try {
        const _id = req.query._id;
        const deletedContact = await contactsService.deleteContact(_id);
        await contactCache.deleteCacheData(_id)
        return status.success(res, "200", `Deleted Successfully ${deletedContact.firstName + " " + deletedContact.contactNumber}`)
    } catch (error) {
        return status.error(res, "500", error);
    };
};
