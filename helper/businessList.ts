import { ListOfBusiness, SearchInBusiness } from "./helperInterface";

export class BusinessList {
  
  public static searchInBusiness = (emailSearch?: string, numberSearch?: string, size?: string, page?: string):SearchInBusiness => {
    try {
      let condition:SearchInBusiness = {};
      if (emailSearch || numberSearch) {
        condition = {
          $or: [{ email: { $regex: emailSearch } }, { contactNumber: { $regex: numberSearch } }],
        };
      } else if (size && page) {
        condition = {
          limit: parseInt(size),
          offset: parseInt(size) * (parseInt(page) - 1),
        };
      } else if ((condition = {})) {
        condition = {};
      }
      return condition;
    } catch (error) {
      throw error as Error;;
    }
  };

  public static listOfBusiness = (email: string, contactNumber: string):ListOfBusiness|Error => {
    try {
      const condition:ListOfBusiness = {
        $or: [{ email }, { contactNumber }],
      };
      return condition;
    } catch (error) {
      throw error as Error;
    }
  };
}
