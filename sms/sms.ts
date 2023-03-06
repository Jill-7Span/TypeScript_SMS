import express from 'express';
import { SmsController } from './smsController';
import { Auth } from '../middleware/authMiddleware';

export class Sms {
  constructor(public router = express.Router(), public smsController: SmsController, public auth: Auth) {}

  public inRoute() {
    this.router.get('/testSms', this.smsController.test);

    this.router.post('/sendSms', this.auth.authOfBusiness, this.smsController.sendSms);
  }
}
