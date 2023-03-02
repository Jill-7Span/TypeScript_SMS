import { Request, Response, NextFunction } from 'express';
import { object, string } from 'joi';
import { StatusCode } from '../common/statusCodes';

export const loginBusiness = (req: Request, res: Response, next: NextFunction) => {
  const validation = object({
    email: string().required(),
    password: string().required(),
  }).unknown(false); //.unknown(true)
  const { error } = validation.validate(req.body, { abortEarly: false });
  if (error) {
    return StatusCode.error(res, 400, error);
  } else {
    console.log('LogIn Validation Check Successfully');
    next();
  }
};
