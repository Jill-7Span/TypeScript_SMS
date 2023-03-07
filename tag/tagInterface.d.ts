export interface TagModelInterface {
  _id?: Types.ObjectId | string;
  tag?: string;
  businessId?: string | Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
export type T = TagModelInterface | null;
type E = Error;

export type TagData = T | E;

export interface TagArrayInterface {
  _id?: Types.ObjectId | string;
  tag: string;
  businessId: string | Types.ObjectId;
  createdAt: any;
  updatedAt: any;
}
