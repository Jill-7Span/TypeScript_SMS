import { E } from "../tag/tagInterface";

export interface templateSearch {
  templateId?: string;
  search?: string;
}

export interface TemplateModelInterface {
  _id: Types.ObjectId | string;
  template: string;
  category: string;
  businessId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ABC = TemplateModelInterface | null

export type TemplateData = ABC | E