import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    body: String,
    username: String,
    userId: String,
    likes: [
      {
        username: String,
      },
    ],
    comments: [
      {
        body: String,
        username: String,
      },
    ],
  },
  { timestamps: true }
);

postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

const Post = mongoose.model("Post", postSchema);

export { Post };
