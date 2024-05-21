import { User } from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../utils/validators.js";
import { SECRET_KEY } from "../index.js";

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

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
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    login: async (_, { username, password }) => {
      // const { errors, valid } = validateLoginInput(username, password);
      const user = await User.findOne({ username });
      if (!user) {
        // errors.general = "User not found";
        throw new Error(`Wrong credentials`);
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // errors.general = "Wrong credential";
        throw new Error(`Wrong credentials`);
      }

      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};

export { user_resolver };
