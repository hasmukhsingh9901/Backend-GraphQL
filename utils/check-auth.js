import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";
import { AuthenticationError } from "apollo-server-express";

import { SECRET_KEY } from "../index.js";

const authContext = async (context) => {
  const token = context.req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new Error("Unauthorized request");
  }
  const decoded_token = await jwt.verify(token, SECRET_KEY);

  const user = await User.findById(decoded_token?.id);
  if (!user) {
    throw new Error("Invalid access token");
  }
  // context.req.user = user;
  console.log("Authenticated user:", user.username);
  return { username: user.username };
};

export default authContext;
