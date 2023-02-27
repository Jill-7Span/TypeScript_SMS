import jwt from 'jsonwebtoken';
import env from "./env";


// jwt token
export const tokenJwt = (Business:any) => {
    const tokenData = {
        _id: Business._id,
        role: Business.role,
        firstName: Business.firstName,
        lastName: Business.lastName,
        email: Business.email,
    };
    const token = jwt.sign(tokenData, env.SECRET_KEY);
    return token;
};
