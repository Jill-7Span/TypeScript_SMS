const mongoose = require("mongoose");

const contactsModel = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  tagId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tags',
    required: false,
  }],
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business',
    required: false,
  },
}, {
  versionKey: false,
  timestamps: { createdAt: true, updatedAt: true }
});

const ContactsModel = mongoose.model("contacts", contactsModel);


module.exports = ContactsModel;