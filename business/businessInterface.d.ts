export type Business = BusinessModel | null;
export type B_Array = BusinessModel[] | null;

type _Error = Error;

export type BusinessData = Business | _Error;
export type BusinessArray = B_Array | _Error;

export interface logIn {
  email: string;
  password: string;
}

export interface nameOfBusiness {
  firstName: string;
  lastName: string;
}

export interface BusinessModelInterface {
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
