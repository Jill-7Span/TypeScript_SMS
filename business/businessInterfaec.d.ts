type Business = BusinessModel | null;
type B_Array = BusinessModel[] | null

type _Error = Error;

type BusinessData = Business | _Error;
type BusinessArray = B_Array | _Error;

interface logIn {
  email: string;
  password: string;
}

  interface nameOfBusiness {
    firstName:string,
    lastName:string,
  }

interface BusinessModelInterface {
  _id: Types.ObjectId | string;
  firstName: string;
  lastName: string;
  contactNumber: string | number;
  email: string;
  company: string;
  city: string;
  state: string;
  country: string;
  password?: string;
  confirmPassword?: string;
  updatedAt?: Date;
}