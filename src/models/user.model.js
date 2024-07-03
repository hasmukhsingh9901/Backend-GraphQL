import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
  
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
     
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
    
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      
    },
    password: {
      type: String,
   
      trim: true,
    },
    // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    // followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {

    

    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

export const User = mongoose.model("User", userSchema);
