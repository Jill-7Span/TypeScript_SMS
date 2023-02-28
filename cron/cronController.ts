import cron from 'node-cron';
import { msg, test } from './test';
import { statusSuccess } from '../common/statusCodes';
import sms from '../sms/smsController';

export class CronController {
  cronSchedular = async (req: Request, res: Response) => {
    console.log('hello in cronSchedular');
    const { sec, min, hrs, day, month, dow, message }: any = req.body;

    await cron.schedule(`${sec} ${min} ${hrs} ${day} ${month} ${dow}`, () => {
      console.log('---------------------');
      msg(message);
      const sendSms = test(req, res);
      return statusSuccess(res, 200 ,sendSms);
    });
  };
}
