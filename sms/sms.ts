import express from 'express';
import { SmsController } from './smsController';
import { Auth } from '../middleware/authMiddleware';

export class Sms {
  public router = express.Router();
  public auth: Auth;
  public smsController: SmsController;
  constructor() {
    this.auth = new Auth();
    this.smsController = new SmsController();
  }

  public inRoute() {
    this.router.get('/testSms', this.smsController.test);

    this.router.post('/sendSms', this.auth.authOfBusiness, this.smsController.sendSms);
  }
}
