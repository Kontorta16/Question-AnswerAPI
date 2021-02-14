const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide a Name"],
  },
  email: {
    type: String,
    required: [true,"Please Provide a Email"],
    unique: [true, "Please Try Different Email"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please Provide a Valid Email!",
    ],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    minlength: [6, "Please Provide a Password With Min Length 6"],
    required: [true, "Please Provide a Password"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  about: {
    type: String,
  },
  about: {
    type: String,
  },
  place: {
    type: String,
  },
  website: {
    type: String,
  },
  profile_image: {
    type: String,
    default: "default.jpg",
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User",UserSchema);