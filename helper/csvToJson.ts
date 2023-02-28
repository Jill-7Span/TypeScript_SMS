import csvtojson from 'csvtojson';
import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';
import { statusError } from '../common/indexOfCommon';
import { Tags } from '../tag/tagService';

const tags = new Tags();

export const csvToJson = async (req: Request, res: Response) => {
  const businessId = req.business._id;
  const tagName = req.query.tags;
  const tagId = await tags.findTags(tagName, businessId);
  const document = path.join(__dirname, `../temp/${req.file.originalname}`);
  const csvData = await csvtojson().fromFile(document);
  csvData.forEach((obj) => {
    obj['businessId'] = businessId;
    obj['tagId'] = tagId._id;
  });
  fs.unlink(document, (error) => {
    if (error) {
      return statusError(res, 400, error);
    }
  });
  console.log(`Temp File ${document} is deleted`);
  return csvData;
};
