import express from 'express';
import { CronController } from './cronController';
import { Auth } from '../middleware/authMiddleware';
import { routes } from '../interface/routesInterface';

export class Cron implements routes {
  public router = express.Router();
  public cronController: CronController;
  public auth: Auth;

  constructor() {
    this.cronController = new CronController();
    this.auth = new Auth();
  }
  public inRoute() {
    this.router.post('/cronSchedular', this.auth.authOfBusiness, cronController.cronSchedular);
  }
};

// router.post("/test",  cronController.test);
