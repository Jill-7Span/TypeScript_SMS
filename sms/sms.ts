import express from 'express';
import { SmsController } from './smsController';
import { Auth } from '../middleware/authMiddleware';

export class Sms {
  public router = express.Router();
  public smsController: SmsController;
  public auth: Auth;

  constructor() {
    this.smsController = new SmsController();
    this.auth = new Auth();
  }

  public inRoute () {
    this.router.get('/testSms', this.smsController.test);
    
    this.router.post('/sendSms', this.auth.authOfBusiness, this.smsController.sendSms);

  }
}


module.exports = router;
