import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import string from 'string-sanitizer';
import { statusError } from '../common/statusCodes';

export const updateBusiness = (req: Request, res: Response, next: NextFunction) => {
  const validation = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    contactNumber: Joi.string().required(),
    email: Joi.string().required(),
  }).unknown(false); //.unknown(true)
  const { error } = validation.validate(req.body, { abortEarly: false });
  if (error) {
    return statusError(res, 400, error);
  } else {
    const bodyData = req.body;
    bodyData.firstName = string.sanitize.removeNumber(bodyData.firstName);
    bodyData.lastName = string.sanitize.removeNumber(bodyData.lastName);
    // bodyData.email = string.validate.isEmail(bodyData.email)     //email validation
    bodyData.firstName = bodyData.firstName.charAt(0).toUpperCase() + bodyData.firstName.slice(1);
    bodyData.lastName = bodyData.lastName.charAt(0).toUpperCase() + bodyData.lastName.slice(1);
    console.log('Update business Data Validation Check Successfully');
    next();
  }
};
