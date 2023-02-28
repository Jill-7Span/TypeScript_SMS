import { Request, Response ,NextFunction } from 'express';
import { object, string } from 'joi';
import { statusError } from "../common/statusCodes";

export const loginBusiness = (req:Request, res:Response, next:NextFunction) => {
    const validation = object({
        email: string().required(),
        password: string().required(),
    }).unknown(false);  //.unknown(true)
    const { error } = validation.validate(req.body, { abortEarly: false });
    if (error) {
        return statusError(res,400,error);
    } else {
        console.log("LogIn Validation Check Successfully");
        next();
    }
};
