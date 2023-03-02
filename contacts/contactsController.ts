import { Request, Response } from 'express';
import { ContactService } from './contactsService';
import { TagService } from '../tag/tagService';
import { StatusCode } from '../common/statusCodes';
import { listOfNumbers } from '../helper/listOfNumbers';
import { CsvToJson } from '../helper/csvToJson';
import { Cache } from '../cache/cacheRequest';
import { contactInterface } from './contactInterface';

export class ContactController {
  public cache: Cache;
  public contactService: ContactService;
  public tagService: TagService;

  constructor() {
    this.cache = new Cache();
    this.contactService = new ContactService();
    this.tagService = new TagService();
  }

  //  Find Contact
  findContact = async (req: Request, res: Response) => {
    try {
      const _id: string = req.body._id;
      const cachedContact = await this.cache.getCacheData(_id);
      if (cachedContact !== null) {
        return StatusCode.success(res, 200, JSON.parse(cachedContact as string));
      } else {
        const contact = await this.contactService.findContact(_id);
        await this.cache.setCacheData(_id, contact);
        return StatusCode.success(res, 200, contact);
      }
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  //  List Of Contacts
  allContacts = async (req: Request, res: Response) => {
    try {
      const businessId: string = res.locals.business;
      const searchTags = req.query;
      const condition = await listOfNumbers(searchTags, businessId);
      const allContacts = await this.contactService.allContacts(condition);
      return StatusCode.success(res, 200, allContacts);
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  //  CSV Upload
  csvUpload = async (req: Request, res: Response) => {
    try {
      const csvData = await CsvToJson.csvToJson(req, res);
      const csv = await this.contactService.csvUpload(csvData);
      return StatusCode.success(res, 201, csv);
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  // Update Contact
  updateContact = async (req: Request, res: Response) => {
    try {
      const businessId:string = res.locals.business;
      const bodyData:Partial<contactInterface> = req.body;
      const updatedAt = new Date();
      const updatedContact = await this.contactService.updateContact(businessId, bodyData, updatedAt);
      await this.cache.setCacheData(updatedContact._id, updatedContact);
      return StatusCode.success(res, 200, updatedContact);
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  // Update Contact Tags
  updateContactTags = async (req: Request, res: Response) => {
    try {
      const businessId = res.locals.business;
      const { _id, tagName } = req.body;
      const tag = await this.tagService.findTags(tagName, businessId);
      const updatedTag = await this.contactService.updateContactTags(_id, tag.tagName);
      return StatusCode.success(res, 200, updatedTag);
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  // Delete Contact
  deleteContact = async (req: Request, res: Response) => {
    try {
      const _id = req.query._id;
      const deletedContact = await this.contactService.deleteContact(_id);
      await this.cache.deleteCacheData(_id);
      return StatusCode.success(
        res,
        200,
        `Deleted Successfully ${deletedContact.firstName + ' ' + deletedContact.contactNumber}`
      );
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };
}
