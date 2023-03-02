import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { env } from '../common/env';
import { StatusCode } from '../common/statusCodes';

export class Auth {

  authOfBusiness = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization'];
    const tokenId = authorization && authorization.split(' ')[1];
    jwt.verify(tokenId as string, env.SECRET_KEY as string, (error, business) => {
      if (error) {
        return StatusCode.error(res, 401, error);
      }
      try {
        console.log('admin Middleware Check is Successfully');
        res.locals.business = business;
        next();
      } catch (error) {
        return StatusCode.error(res, 500, error);
      }
    });
  };
}
