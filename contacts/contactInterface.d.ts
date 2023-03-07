export interface contactInterface {
  _id?: Types.ObjectId | string;
  firstName?: string;
  lastName?: string;
  contactNumber?: number;
  email?: string;
  tagId?: string;
  businessId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface TagUpdate {
  _id:string,
  tagName:string
}
type A = contactInterface | null;
type B = Error;

export type C = A | B;

export type D = contactInterface[] | null;

export type F = D | B
