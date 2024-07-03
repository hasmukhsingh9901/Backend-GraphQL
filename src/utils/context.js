import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const context = ({ req }) => {
  const token = req.headers.authorization || "";
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return {
        user: User.findById(decoded.userId),
      };
    } catch (err) {
      throw new Error("Invalid token");
    }
  }
  return {};
};


export default context