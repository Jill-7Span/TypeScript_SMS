import express from 'express';
import { Business } from '../business/business';
import { Contact } from '../contacts/contacts';
import { Template } from '../template/template';
import { Sms } from '../sms/sms';
import { Cron } from '../cron/cron';
import { Tag } from '../tag/tag';

export class Routes {
  public router = express.Router();
  public business: Business;
  public contact: Contact;
  public template: Template;
  public sms: Sms;
  public cron: Cron;
  public tag: Tag;
  constructor() {
    this.business = new Business();
    this.contact = new Contact();
    this.template = new Template();
    this.sms = new Sms();
    this.cron = new Cron();
    this.tag = new Tag();
  }
  route() {
    // Routes
    this.router.use('/business', this.business.inRoute);

    this.router.use('/contacts', this.contact.inRoute);

    this.router.use('/templates', this.template.inRoute);

    this.router.use('/sms', this.sms.inRoute);

    this.router.use('/schedular', this.cron.inRoute);

    this.router.use('/tags', this.tag.inRoute);
  }
}
