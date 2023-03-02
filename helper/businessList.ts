export class BusinessList {
  
  public static searchInBusiness = (emailSearch?: String, numberSearch?: String, size?: string, page?: string) => {
    try {
      let condition = {};
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
      return error;
    }
  };

  public static listOfBusiness = (email: string, contactNumber: string) => {
    try {
      const condition = {
        $or: [{ email }, { contactNumber }],
      };
      return condition;
    } catch (error: any) {
      return error;
    }
  };
}
