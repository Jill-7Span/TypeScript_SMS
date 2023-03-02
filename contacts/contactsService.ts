import { CheckData } from '../common/nullChecK';
import { ContactsModel } from '../models/contactsModel';
import { contactInterface } from './contactInterface';

export class ContactService {
  //  Find Contact
  findContact = async (_id: string): Promise<contactInterface | null | Error> => {
    try {
      const data: contactInterface | null = await ContactsModel.findOne({ _id });
      return CheckData.nullCheck(data);
    } catch (error) {
      return error as Error;
    }
  };

  //  List of Contact
  allContacts = async (condition) => {
    try {
      // .populate("businessId","-_id firstName lastName");  to populate business data
      const data = await ContactsModel.find(condition).populate('tagId', '-_id tag');
      return CheckData.nullCheck(data);
    } catch (error) {
      return error;
    }
  };

  //  Upload CSV
  csvUpload = async (csvData) => {
    try {
      const newCsvData = await ContactsModel.create(csvData);
      return CheckData.nullCheck(newCsvData);
    } catch (error) {
      return error;
    }
  };

  //  Update Contact Tags
  updateContactTags = async (_id, tagsId) => {
    try {
      const updatedContact = await contactsModel.updateMany({ _id: { $in: _id } }, { $set: { tagId: tagsId } });
      // await contactsCache.setCacheData(CheckData.nullCheck.id, CheckData.nullCheck);
      return CheckData.nullCheck(updatedContact);
    } catch (error) {
      return error;
    }
  };

  //  Update Contact
  updateContact = async (
    businessId: string,
    bodyData: Partial<contactInterface>,
    updatedAt: Date
  ): Promise<Error | Partial<contactInterface> | null> => {
    try {
      const updatedContact: Partial<contactInterface> | null = await contactsModel.findOneAndUpdate(
        { $and: [{ _id: bodyData._id }, { business: businessId }] },
        {
          $set: { bodyData, updatedAt },
        },
        { new: true }
      );
      // await contactsCache.setCacheData(CheckData.nullCheck.id, CheckData.nullCheck);
      return CheckData.nullCheck(updatedContact);
    } catch (error) {
      return error as Error;
    }
  };

  //  Delete Contact
  deleteContact = async (_id: string) => {
    try {
      const data = await contactsModel.findByIdAndDelete(_id);
      return CheckData.nullCheck(data);
    } catch (error) {
      return error;
    }
  };
}
