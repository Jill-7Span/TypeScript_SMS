import { Request, Response, NextFunction } from 'express';
import model from '../models/db';
import jwt from 'jsonwebtoken';
import env from '../common/envtjs';
import { StatusCode } from '../common/indexOfCommon';

export class Auth {
    public statusCode: StatusCode;

    constructor () {
        this.statusCode = new StatusCode();
    }
}

exports.authOfBusiness = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'];
  const tokenId = authorization && authorization.split(' ')[1];
  jwt.verify(tokenId, env.SECRET_KEY, (error, business) => {
    if (error) {
      return this.statusCode.error(res, '401', error);
    }
    try {
      console.log('admin Middleware Check is Successfully');
      req.business = business;
      next();
    } catch (error) {
      return status.error(res, '500', error);
    }
  });
};
