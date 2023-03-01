import mongoose from 'mongoose';

export interface tagModel {
  _id: String;
  tag: String;
  businessId: String;
  createdAt: any;
  updatedAt: any;
};

const tags = new mongoose.Schema(
  {
    tag: {
      type: String,
      required: true,
      trim: true,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'business',
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: true },
  }
);
const TagModel = mongoose.model('tags', tags);

export { TagModel };
