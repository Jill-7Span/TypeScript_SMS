// insert business
const Joi = require('joi');
const string = require("string-sanitizer");
const status = require("../common/statusCodes");

exports.updateBusiness = (req, res, next) => {
    const validation = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        contactNumber: Joi.string().required(),
        email: Joi.string().required(),
    })
        .unknown(false);//.unknown(true)
    const { error } = validation.validate(req.body, { abortEarly: false });
    if (error) {
        return status.error(res,"400",error);
    } else {
        const bodyData = req.body;
        bodyData.firstName = string.sanitize.removeNumber(bodyData.firstName);
        bodyData.lastName = string.sanitize.removeNumber(bodyData.lastName);
        // bodyData.email = string.validate.isEmail(bodyData.email)     //email validation
        bodyData.firstName = bodyData.firstName.charAt(0).toUpperCase() + bodyData.firstName.slice(1);
        bodyData.lastName = bodyData.lastName.charAt(0).toUpperCase() + bodyData.lastName.slice(1);
        console.log("Update business Data Validation Check Successfully");
        next();
    }
};