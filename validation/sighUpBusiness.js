// insert business
import { object, string as _string } from 'joi';
import { sanitize } from "string-sanitizer";
import { error as this.statusCode.error } from "../common/statusCodes";

export const signUpBusiness = (req, res, next) => {
    const validation = object({
        firstName: _string().required(),
        lastName: _string().required(),
        contactNumber: _string().required(),
        email: _string().required(),
        password: _string().required(),
        confirmPassword: _string().required(),
        city:_string().required(),
        state:_string().required(),
        country:_string().required(),
        company:_string().required(),
    })
        .unknown(false);//.unknown(true)
    const { error } = validation.validate(req.body, { abortEarly: false });
    if (error) {
        return this.statusCode.error(res,"400",error);
    } else {
        const bodyData = req.body;
        bodyData.firstName = sanitize.removeNumber(bodyData.firstName);
        bodyData.lastName = sanitize.removeNumber(bodyData.lastName);
        // bodyData.email = string.validate.isEmail(bodyData.email)     //email validation
        bodyData.firstName = bodyData.firstName.charAt(0).toUpperCase() + bodyData.firstName.slice(1);
        bodyData.lastName = bodyData.lastName.charAt(0).toUpperCase() + bodyData.lastName.slice(1);
        console.log("Insert business Data Validation Check Successfully");
        next();
    }
}