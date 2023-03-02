import { Response } from 'express';

//  Status Codes
export class StatusCode {
  public static error = (res: Response, statusCode: number, errors: any) => {
    return res.status(statusCode).json({
      statusCode: statusCode,
      Message: errors.message || errors,
    });
  };

  public static success = (res: Response, statusCode: number, data: any) => {
    const key = res.req.route.path;
    return res.status(statusCode).json({
      statusCode: statusCode,
      [key]: data, // Dynamic Key to JSON
    });
  };
}

// const code = {
//   401: 'Unauthorized',
//   200: 'success',
//   201: 'created',
//   400: 'Bad Request',
//   403: 'Already Exits',
//   '404': 'Not Found',
//   '408': 'Request Timeout',
//   '429': 'Too Many Requests',
//   500: 'Internal Server Error',
//   '503': 'Service Unavailable',
// };
