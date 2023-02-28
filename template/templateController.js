const Filter = require('bad-words');
const filter = new Filter();
const templateService = require("./templateService");
const status = require("../common/indexOfCommon");
const template = require("../common/findTemplate");

//  Read Template
exports.readTemplate = async (req:Request, res:Response) => {
    try {
        const condition = await template.findTemplate(req);
        const readTemplate = await templateService.readTemplate(condition);
        return statusSuccess(res, "200", readTemplate);
    } catch (error) {
        return statusError(res, "500", error);
    };
};

//  Add Template
exports.addTemplate = async (req:Request, res:Response) => {
    try {
        const { template, category } = req.body;
        const massage = filter.clean(template);
        const templateData = {
            category: category,
            template: massage,
            businessId: req.business._id,
        };
        const createdTemplate = await templateService.addTemplate(templateData);
        return statusSuccess(res, "201", createdTemplate);
    } catch (error) {
        return statusError(res, "500", error);
    };
};

//  Update Template
exports.updateTemplate = async (req:Request, res:Response) => {
    try {
        const businessId = req.business._id;
        const { _id, category, template } = req.query;
        const updatedAt = new Date();
        const updatedTemplate = await templateService.updateTemplate(_id, businessId, category, template, updatedAt);
        return statusSuccess(res, "200", updatedTemplate);
    } catch (error) {
        return statusError(res, "500", error);
    };
};

//  Delete Template
exports.deleteTemplate = async (req:Request, res:Response) => {
    try {
        const _id = req.query._id;
        const businessId = req.business._id;
        let condition = {
            $and: [{ businessId }, { _id }]
        }
        await templateService.deleteTemplate(condition);
        return statusSuccess(res, "200", "Deleted Successfully")
    } catch (error) {
        return statusError(res, "500", error);
    };
};
