export interface SearchInBusiness {
  emailSearch?: string;
  numberSearch?: string;
  size?: string;
  page?: string;
  limit?: number;
  offset?: number;
  $or?: {
    email?: {
      $regex?: string;
    };
    contactNumber?: {
      $regex?: string;
    };
  }[];
}

// interface ListOfBusiness{
//   email?:string,
//   contactNumber?:string,
// }

export interface ListOfBusiness {
  $or: (
    | {
        email: string;
        contactNumber?: undefined;
      }
    | {
        contactNumber: string;
        email?: undefined;
      }
  )[];
}

export interface NumberListInterface {
  $and?: ({ businessId?: string} | { tagId?: string })[];
  [key: string]: any;
}

export interface FindTemplateInterface  {
  $and?: {
    $or?: {
      template?: { $regex?: string },
      category?: { $regex?: string }
    }[],
    _id?: string,
    businessId?: string
  }[]
}