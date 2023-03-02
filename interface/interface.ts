import { Types, Document } from 'mongoose';

export interface searchQuery {
  emailSearch?: string;
  numberSearch?: string;
  size?: string;
  page?: string;
}

export interface logIn {
  email: string;
  password: string;
}

export interface BodyData {
  email?: String;
  contactNumber?: String;
}

export interface businessModel {
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

export interface changePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
