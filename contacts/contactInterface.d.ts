interface contactInterface {
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
interface TagUpdate {
  _id:string,
  tagName:string
}
type A = contactInterface | null;
type B = Error;

type C = A | B;

type D = contactInterface[] | null;

type F = D | B
