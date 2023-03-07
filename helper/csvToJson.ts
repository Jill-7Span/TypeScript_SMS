import csvtojson from 'csvtojson';
import path from 'path';
import fs from 'fs';
import { Response } from 'express';
import { StatusCode } from '../common/statusCodes';
import { TagService } from '../tag/tagService';
import { TagChecker } from './tagChecker';

export class Convert {
  public statusCode: StatusCode;
  public tags: TagService;
  constructor() {
    this.statusCode = new StatusCode();
    this.tags = new TagService();
  }

  public static csvToJson = async (req: any, res: Response) => {
    const businessId: string = res.locals.business._id;
    const tagName = req.query.tags as string;
    const tagId = await TagChecker.findTag(tagName, businessId);
    const document = path.join(__dirname, `../temp/${req.file.originalname}`);
    const csvData = await csvtojson().fromFile(document);
    csvData.forEach((obj) => {
      obj['businessId'] = businessId;
      obj['tagId'] = tagId._id;
    });
    fs.unlink(document, (error) => {
      if (error) {
        return StatusCode.error(res, 400, error);
      }
    });
    console.log(`Temp File ${document} is deleted`);
    return csvData;
  };
}
