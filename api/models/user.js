const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
      isAsync: false,
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updateDate: {
    type: Date,
  },
  phone: {
    type: String,
    validate: {
      validator: validator.isMobilePhone,
      message: "{VALUE} is not a valid phone",
      isAsync: false,
    },
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  avatar: {
    data: String,
    contentType: String,
  },
  favorites: [String],
  publicAccess: {
    monday: {
      access: Boolean,
      hours: String,
    },
    tuesday: {
      access: Boolean,
      hours: String,
    },
    wednesday: {
      access: Boolean,
      hours: String,
    },
    thursday: {
      access: Boolean,
      hours: String,
    },
    friday: {
      access: Boolean,
      hours: String,
    },
    saturday: {
      access: Boolean,
      hours: String,
    },
    sunday: {
      access: Boolean,
      hours: String,
    },
  },
  registeredAnimals: [String],
});

module.exports = mongoose.model("Users", userSchema);
