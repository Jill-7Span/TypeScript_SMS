const jwt = require('jsonwebtoken');
const env = require("../common/env");


// jwt token
exports.tokenJwt = (Business) => {
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
