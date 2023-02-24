export class StatusCode {

    //  Status Codes

    error = (res, statusCode, errors) => {
        return res.status(statusCode).json({
            statusCode: statusCode,
            Message: errors.message || errors,
        });
    };

    success = (res, statusCode, data) => {
        const key = res.req.route.path;
        return res.status(statusCode).json({
            statusCode: statusCode,
            [key]: data,        // Dynamic Key to JSON
        });
    };
}




const code = {
    "401": "Unauthorized",
    "200": "success",
    "201": "created",
    "400": "Bad Request",
    "403": "Already Exits",
    "404": "Not Found",
    "408": "Request Timeout",
    "429": "Too Many Requests",
    "500": "Internal Server Error",
    "503": "Service Unavailable",
}