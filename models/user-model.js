import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
