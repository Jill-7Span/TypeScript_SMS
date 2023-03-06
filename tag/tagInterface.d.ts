interface TagModelInterface {
  _id?: Types.ObjectId | string;
  tag?: string;
  businessId?: string | Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
type T = TagModelInterface | null;
type E = Error;

type TagData = T | E;

interface TagArrayInterface {
  _id?: Types.ObjectId | string;
  tag: string;
  businessId: string | Types.ObjectId;
  createdAt: any;
  updatedAt: any;
}
