import { ApiError } from "../../errors/apiError.js";
import { User } from "../../models/user.model.js";
import jwt from "jsonwebtoken";

const userResolvers = {
  Mutation: {
    registerUser: async (_, { input }) => {
      try {
        const { username, email, password, confirmPassword, fullName, avatar } = input;

        console.log('Input received:', input);

        if ([username, email, password, confirmPassword, fullName, avatar].some(
          (field) => !field || field.trim() === ""
        )) {
          throw new ApiError("All fields are required", 400);
        }

        if (password !== confirmPassword) {
          throw new ApiError("Passwords do not match", 400);
        }

        const newUser = await User.create({
          username,
          email,
          password,
          fullName,
          avatar
        });

        console.log('New user created:', newUser);

        const token = jwt.sign(
          { id: newUser.id, email: newUser.email, username: newUser.username },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        const user = { ...newUser._doc, id: newUser._id, token };
        console.log('User to return:', user);

        return {
          message: "User Registered Successfully!",
          user,
        };
      } catch (error) {
        console.error('Error registering user:', error);
        throw new ApiError(error.message, 500);
      }
    },
  },
  Query: {},
};

export { userResolvers };
