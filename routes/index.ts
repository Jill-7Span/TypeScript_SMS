import express from "express";
import { Business } from "../business/business";
import { Contact } from "../contacts/contacts";
import { Template } from "../template/template";
import { Sms } from "../sms/sms";
import { Cron } from "../cron/cron";
import { Tag } from "../tag/tag";

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
    this.router.use("/business", this.business.businessRoute);

    this.router.use("/contacts", contacts);

    this.router.use("/templates", templates);

    this.router.use("/sms", sms);

    this.router.use("/schedular", schedular);

    this.router.use("/tags", tags);
  }
};
