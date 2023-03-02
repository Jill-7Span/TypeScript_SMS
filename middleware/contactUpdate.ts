// insert business
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../common/statusCodes';

export const updateBusiness = (req: Request, res: Response, next: NextFunction) => {
  const validation = Joi.object({
    contactId: Joi.string().required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    contactNumber: Joi.string(),
    email: Joi.string(),
    tags: Joi.string(),
  }).unknown(false); //.unknown(true)
  const { error } = validation.validate(req.body, { abortEarly: false });
  if (error) {
    return StatusCode.error(res, 400, error);
  } else {
    console.log('Update Contact Data Validation Check Successfully');
    next();
  }
};
