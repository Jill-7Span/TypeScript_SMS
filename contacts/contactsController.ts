import { Request, Response } from 'express';
import { ContactService } from './contactsService';
import { TagService } from '../tag/tagService';
import { StatusCode } from '../common/statusCodes';
import { NumbersList } from '../helper/listOfNumbers';
import { Convert } from '../helper/csvToJson';
import { Cache } from '../cache/cacheRequest';
import { NumberListInterface } from '../helper/helperInterface';
import { contactInterface, TagUpdate } from './contactInterface';

export class ContactController {
  public cache: Cache;
  public contactService: ContactService;
  public tagService: TagService;
  public numbers: NumbersList;
  constructor() {
    this.cache = new Cache();
    this.contactService = new ContactService();
    this.tagService = new TagService();
    this.numbers = new NumbersList();
  }

  //  Find Contact
  public findContact = async (req: Request, res: Response) => {
    try {
      const _id: string = req.body._id;
      const cachedContact = await this.cache.getCacheData(_id);
      if (cachedContact !== null) {
        return StatusCode.success(res, 200, JSON.parse(cachedContact as string));
      } else {
        const contact = await this.contactService.findContact(_id);
        await this.cache.setCacheData(_id, contact as object);
        return StatusCode.success(res, 200, contact);
      }
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  //  List Of Contacts
  public allContacts = async (req: Request, res: Response) => {
    try {
      const businessId: string = res.locals.business;
      const searchTags: string = req.query.searchTags as string;
      const condition = (await this.numbers.listOfNumbers(searchTags, businessId)) as NumberListInterface;
      const allContacts = await this.contactService.allContacts(condition);
      return StatusCode.success(res, 200, allContacts);
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  //  CSV Upload
  public csvUpload = async (req: Request, res: Response) => {
    try {
      const csvData = await Convert.csvToJson(req, res);
      const csv = await this.contactService.csvUpload(csvData);
      return StatusCode.success(res, 201, csv);
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  // Update Contact
  public updateContact = async (req: Request, res: Response) => {
    try {
      const businessId: string = res.locals.business;
      const bodyData: Partial<contactInterface> = req.body;
      const updatedAt = new Date();
      const updatedContact = (await this.contactService.updateContact(
        businessId,
        bodyData,
        updatedAt
      )) as contactInterface;
      if (updatedContact && updatedContact != null) {
        await this.cache.setCacheData(updatedContact._id, updatedContact);
        return StatusCode.success(res, 200, updatedContact);
      }
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  // Update Contact Tags
  public updateContactTags = async (req: Request, res: Response) => {
    try {
      const businessId = res.locals.business;
      const { _id, tagName }: TagUpdate = req.body;
      const tag:any = await this.tagService.findTags(tagName, businessId);
      const updatedTag = await this.contactService.updateContactTags(_id, tag!.tagName);
      return StatusCode.success(res, 200, updatedTag);
    } catch (error) {
      return StatusCode.error(res, 500, error);
    }
  };

  // Delete Contact
  public deleteContact = async (req: Request, res: Response) => {
    try {
      const _id = req.query._id as string;
      const deletedContact:any  = await this.contactService.deleteContact(_id);
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
