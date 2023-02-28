export const getBusinessList = (emailSearch: String, numberSearch: String, size: any, page: any) => {
  try {
    let condition = {};
    if (emailSearch || numberSearch) {
      condition = {
        $or: [{ email: { $regex: emailSearch } }, { contactNumber: { $regex: numberSearch } }],
      };
    } else if (size && page) {
      condition = {
        limit: parseInt(size),
        offset: parseInt(size) * parseInt(page - 1),
      };
    } else if ((condition = {})) {
      condition = {};
    }
    return condition;
  } catch (error) {
    return error;
  }
};

export const businessData = (bodyData: any) => {
  try {
    const condition = {
      $or: [{ email: bodyData.email }, { contactNumber: bodyData.contactNumber }],
    };
    return condition;
  } catch (error) {
    return error;
  }
};
