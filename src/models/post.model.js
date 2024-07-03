import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    
    },
    content: {
      type: String,
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        body:String,
        username: String,
        createdAt:String
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
