export interface templateSearch {
  templateId?: String;
  search?: String;
}

export interface templateModel {
  _id: String;
  template: String;
  category: String;
  businessId: String;
  createdAt: any;
  updatedAt: any;
}
