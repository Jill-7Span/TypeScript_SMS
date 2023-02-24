// insert business
const Joi = require('joi');
const status = require("../common/statusCodes");

exports.updateBusiness = (req, res, next) => {
    const validation = Joi.object({
        contactId:Joi.string().required(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        contactNumber: Joi.string(),
        email: Joi.string(),
        tags:Joi.string(),
    })
        .unknown(false);//.unknown(true)
    const { error } = validation.validate(req.body, { abortEarly: false });
    if (error) {
        return status.error(res,"400",error);
    } else {
        console.log("Update Contact Data Validation Check Successfully");
        next();
    }
};