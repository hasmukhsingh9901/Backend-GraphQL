import { User } from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const user_resolver = {
  Mutation: {
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) => {
      // Check if passwords match
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Check if the user already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        throw new Error("User with this username or email already exists");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      const res = await newUser.save();

      // Generate a token
      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};

export { user_resolver };
