const mongoose = require("mongoose");

const userPost = new mongoose.Schema({
  name: String,
  age: Number,
});

module.exports.userPostModel =
  mongoose.models?.userPost || mongoose.model("userPost", userPost);
