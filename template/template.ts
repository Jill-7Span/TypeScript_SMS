import express from 'express';
import { TemplateController } from './templateController';
import { Auth } from '../middleware/authMiddleware';
import { routes } from '../interface/routesInterface';

export class Template implements routes {
  public router = express.Router();
  public auth: Auth;
  public templateController: TemplateController;

  constructor() {
    this.auth = new Auth();
    this.templateController = new TemplateController();
  }

  public inRoute() {
    this.router.get('/readTemplate', this.auth.authOfBusiness, this.templateController.addTemplate);

    this.router.post('/addTemplate', this.auth.authOfBusiness, this.templateController.addTemplate);

    this.router.put('/updateTemplate', this.auth.authOfBusiness, this.templateController.updateTemplate);

    this.router.delete('/deleteTemplate', this.auth.authOfBusiness, this.templateController.deleteTemplate);
  }
};
