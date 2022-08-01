const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: String,
  creatorId: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  imgName: String,
  imgPath: String,
  publicId: String,
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
