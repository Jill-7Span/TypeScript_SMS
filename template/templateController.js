const Filter = require('bad-words');
const filter = new Filter();
const templateService = require("./templateService");
const status = require("../common/indexOfCommon");
const template = require("../common/findTemplate");

//  Read Template
exports.readTemplate = async (req, res) => {
    try {
        const condition = await template.findTemplate(req);
        const readTemplate = await templateService.readTemplate(condition);
        return status.success(res, "200", readTemplate);
    } catch (error) {
        return status.error(res, "500", error);
    };
};

//  Add Template
exports.addTemplate = async (req, res) => {
    try {
        const { template, category } = req.body;
        const massage = filter.clean(template);
        const templateData = {
            category: category,
            template: massage,
            businessId: req.business._id,
        };
        const createdTemplate = await templateService.addTemplate(templateData);
        return status.success(res, "201", createdTemplate);
    } catch (error) {
        return status.error(res, "500", error);
    };
};

//  Update Template
exports.updateTemplate = async (req, res) => {
    try {
        const businessId = req.business._id;
        const { _id, category, template } = req.query;
        const updatedAt = new Date();
        const updatedTemplate = await templateService.updateTemplate(_id, businessId, category, template, updatedAt);
        return status.success(res, "200", updatedTemplate);
    } catch (error) {
        return status.error(res, "500", error);
    };
};

//  Delete Template
exports.deleteTemplate = async (req, res) => {
    try {
        const _id = req.query._id;
        const businessId = req.business._id;
        let condition = {
            $and: [{ businessId }, { _id }]
        }
        await templateService.deleteTemplate(condition);
        return status.success(res, "200", "Deleted Successfully")
    } catch (error) {
        return status.error(res, "500", error);
    };
};
