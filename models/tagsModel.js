const mongoose = require("mongoose");

const tags = new mongoose.Schema({

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
}, {
  versionKey: false,
  timestamps: { createdAt: true, updatedAt: true }
});
const tagsModel = mongoose.model("tags", tags);

module.exports = tagsModel;

