import { Request, Response } from 'express';
import { ContactService } from './contactsService';
import { Tags } from '../tag/tagService';
import { statusError, statusSuccess } from '../common/statusCodes';
import { listOfNumbers } from '../helper/listOfNumbers';
import { csvToJson } from '../helper/csvToJson';
import { Cache } from '../cache/cacheRequest';

export class ContactController {
  public cache: Cache;
  public contactService: ContactService;
  public tags: Tags;

  constructor() {
    this.cache = new Cache();
    this.contactService = new ContactService();
    this.tags = new Tags();
  }

  //  Find Contact
  findContact = async (req: Request, res: Response) => {
    try {
      const _id = req.body._id;
      const cachedContact: any = await this.cache.getCacheData(_id);
      if (cachedContact !== null) {
        return statusSuccess(res, 200, JSON.parse(cachedContact));
      } else {
        const contact = await this.contactService.findContact(_id);
        await this.cache.setCacheData(_id, contact);
        return statusSuccess(res, 200, contact);
      }
    } catch (error) {
      return statusError(res, 500, error);
    }
  };

  //  List Of Contacts
  allContacts = async (req: Request, res: Response) => {
    try {
      const businessId = req.business._id;
      const { searchTags } = req.query;
      const condition = await listOfNumbers(searchTags, businessId);
      const allContacts = await this.contactService.allContacts(condition);
      return statusSuccess(res, 200, allContacts);
    } catch (error) {
      return statusError(res, 500, error);
    }
  };

  //  CSV Upload
  csvUpload = async (req: Request, res: Response) => {
    try {
      const csvData = await csvToJson(req, res);
      const csv = await this.contactService.csvUpload(csvData);
      return statusSuccess(res, 201, csv);
    } catch (error) {
      return statusError(res, 500, error);
    }
  };

  // Update Contact
  updateContact = async (req: Request, res: Response) => {
    try {
      const businessId = req.business._id;
      const bodyData = req.body;
      const updatedAt = new Date();
      const updatedContact = await this.contactService.updateContact(businessId, bodyData, updatedAt);
      await this.cache.setCacheData(updatedContact._id, updatedContact);
      return statusSuccess(res, 200, updatedContact);
    } catch (error) {
      return statusError(res, 500, error);
    }
  };

  // Update Contact Tags
  updateContactTags = async (req: Request, res: Response) => {
    try {
      const businessId = req.business._id;
      const { _id, tagName } = req.body;
      const tag = await this.tags.findTags(tagName, businessId);
      const updatedTag = await this.contactService.updateContactTags(_id, tag.tagName);
      return statusSuccess(res, 200, updatedTag);
    } catch (error) {
      return statusError(res, 500, error);
    }
  };

  // Delete Contact
  deleteContact = async (req: Request, res: Response) => {
    try {
      const _id = req.query._id;
      const deletedContact = await this.contactService.deleteContact(_id);
      await this.cache.deleteCacheData(_id);
      return statusSuccess(
        res,
        200,
        `Deleted Successfully ${deletedContact.firstName + ' ' + deletedContact.contactNumber}`
      );
    } catch (error) {
      return statusError(res, 500, error);
    }
  };
}
