import express from 'express';
import { routes } from '../interface/routesInterface';
import { ContactController } from './contactsController';
import { csvUpload } from '../helper/contactUpload';
import { Auth } from '../middleware/authMiddleware';

export class Contact implements routes {
  public router = express.Router();
  public auth: Auth;
  public contactsController: ContactController;

  constructor() {
    this.contactsController = new ContactController();
    this.auth = new Auth();
  }
  public inRoute() {
    this.router.get('/findContact', this.auth.authOfBusiness, this.contactsController.findContact);

    this.router.get('/allContacts', this.auth.authOfBusiness, this.contactsController.allContacts);

    this.router.post('/csvUpload', [this.auth.authOfBusiness, csvUpload], this.contactsController.csvUpload);

    this.router.put('/updateContact', this.auth.authOfBusiness, this.contactsController.updateContact);

    this.router.put('/updateContactTags', this.auth.authOfBusiness, this.contactsController.updateContactTags);

    this.router.delete('/deleteContact', this.auth.authOfBusiness, this.contactsController.deleteContact);
  }
};
