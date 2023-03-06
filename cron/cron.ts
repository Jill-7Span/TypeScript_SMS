import express from 'express';
import { CronController } from './cronController';
import { Auth } from '../middleware/authMiddleware';
import { routes } from '../interface/routesInterface';

export class Cron implements routes {
  constructor(public router = express.Router(), public cronController: CronController, public auth: Auth) {}
  public inRoute() {
    this.router.post('/cronSchedular', this.auth.authOfBusiness, this.cronController.cronSchedular);
  }
}
