const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: Schema.Types.Object,
    required: true,
  },
  /*postImage: {
    type: String,
    required: true,
  },*/
  imageUrl: {
    type: String,
  },

  text: {
    type: String,
    // required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [],
});

module.exports = mongoose.model("Post", postSchema);
