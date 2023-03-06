interface templateSearch {
  templateId?: string;
  search?: string;
}

interface TemplateModelInterface {
  _id: Types.ObjectId | string;
  template: string;
  category: string;
  businessId: string;
  createdAt: Date;
  updatedAt: Date;
}

type ABC = TemplateModelInterface | null

type TemplateData = ABC | E