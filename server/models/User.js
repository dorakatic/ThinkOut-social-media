const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  userImage: {
    type: String,
  },
  followers: [],
  following: [],
  liked: [],
});

module.exports = mongoose.model("User", userSchema);
