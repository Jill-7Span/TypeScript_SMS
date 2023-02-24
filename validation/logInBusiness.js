import { object, string } from 'joi';
import { error as this.statusCode.error } from "../common/statusCodes";

export function loginBusiness(req, res, next) {
    const validation = object({
        email: string().required(),
        password: string().required(),
    }).unknown(false);  //.unknown(true)
    const { error } = validation.validate(req.body, { abortEarly: false });
    if (error) {
        return this.statusCode.error(res,"400",error);
    } else {
        console.log("LogIn Validation Check Successfully");
        next();
    }
}
