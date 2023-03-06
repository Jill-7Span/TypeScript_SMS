import { CheckData } from '../common/nullChecK';
import { ContactsModel } from '../models/contactsModel';

export class ContactService {
  //  Find Contact
  public findContact = async (_id: string): Promise<C> => {
    try {
      const data: contactInterface | null = await ContactsModel.findOne({ _id });
      return CheckData.nullCheck(data);
    } catch (error) {
      throw error as Error;
    }
  };

  //  List of Contact
  public allContacts = async (condition:NumberListInterface):Promise<C> => {
    try {
      // .populate("businessId","-_id firstName lastName");  to populate business data
      const data:contactInterface[] = await ContactsModel.find(condition).populate('tagId', '-_id tag') as contactInterface[]; 
      return CheckData.nullCheck(data);
    } catch (error) {
      throw error as Error;
    }
  };

  //  Upload CSV
  public csvUpload = async (csvData) => {
    try {
      const newCsvData = await ContactsModel.create(csvData);
      return CheckData.nullCheck(newCsvData);
    } catch (error) {
      throw error as Error;;
    }
  };

  //  Update Contact Tags
  public updateContactTags = async (_id, tagsId) => {
    try {
      const updatedContact = await contactsModel.updateMany({ _id: { $in: _id } }, { $set: { tagId: tagsId } });
      // await contactsCache.setCacheData(CheckData.nullCheck.id, CheckData.nullCheck);
      return CheckData.nullCheck(updatedContact);
    } catch (error) {
      throw error as Error;;
    }
  };

  //  Update Contact
  public updateContact = async (businessId: string, bodyData: Partial<contactInterface>, updatedAt: Date): Promise<C> => {
    try {
      const updatedContact: contactInterface | null = await ContactsModel.findOneAndUpdate(
        { $and: [{ _id: bodyData._id }, { business: businessId }] },
        { $set: { bodyData, updatedAt } },
        { new: true }
      );
      // await contactsCache.setCacheData(CheckData.nullCheck.id, CheckData.nullCheck);
      return CheckData.nullCheck(updatedContact);
    } catch (error) {
      return error as Error;
    }
  };

  //  Delete Contact
  public deleteContact = async (_id: string) => {
    try {
      const data = await contactsModel.findByIdAndDelete(_id);
      return CheckData.nullCheck(data);
    } catch (error) {
      throw error as Error;;
    }
  };
}
