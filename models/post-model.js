import mongoose from "mongoose";

const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    body: String,
    username: String,
    comments: [{ body: String, username: String }],
    likes: [{ username: String }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Post = model("Post", postSchema);
