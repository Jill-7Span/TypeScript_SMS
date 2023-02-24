const model = require("../models/db");
const jwt = require('jsonwebtoken');
const env = require("../common/env");
const status = require("../common/indexOfCommon");

exports.authOfBusiness = (req, res, next) => {
    const authorization = req.headers['authorization'];
    const tokenId = authorization && authorization.split(' ')[1];
    jwt.verify(tokenId, env.SECRET_KEY, (error, business) => {
        if (error) {
            return status.error(res,"401",error);
        };
        try {
            console.log("admin Middleware Check is Successfully");
            req.business = business;
            next();
        } catch (error) {
            return status.error(res,"500",error);
        };
    })
};

