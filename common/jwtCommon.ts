import jwt from 'jsonwebtoken';
import { jwtInterface } from './commonInterface';
import { env } from './env';

export class TokenJwt {
  // jwt token
  public static tokenJwt = (business: any): String => {
    const tokenData: jwtInterface = {
      _id: business._id,
      role: business.role,
      firstName: business.firstName,
      lastName: business.lastName,
      email: business.email,
    };
    const token = jwt.sign(tokenData, env.SECRET_KEY as string);
    return token;
  };
}
