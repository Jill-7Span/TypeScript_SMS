import cron from 'node-cron';
import { Request, Response } from 'express';
import { msg, test } from './test';
import { StatusCode } from '../common/statusCodes';

export class CronController {
  public cronSchedular = async (req: Request, res: Response) => {
    console.log('hello in cronSchedular');
    const { sec, min, hrs, day, month, dow, message }: any = req.body;

    await cron.schedule(`${sec} ${min} ${hrs} ${day} ${month} ${dow}`, () => {
      console.log('---------------------');
      msg(message);
      const sendSms = test(req, res);
      return StatusCode.success(res, 200 ,sendSms);
    });
  };
}
