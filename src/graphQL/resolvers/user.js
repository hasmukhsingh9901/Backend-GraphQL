import { ApiError } from "../../errors/apiError.js";
import { User } from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

const userResolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    authUser:async(_,__,{user})=>{
      if(!user) throw new ApiError("You're not authenticated")
      },
    user:async(_,{userId})=>{
      return await User.findById(userId)
    }
  },
  Mutation: {
    signUp: async (_, { input }) => {
      const { name, username, email, password, gender, address, phone } = input;
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
        gender,
        address,
        phone,
      });

      const result = await newUser.save();
      const token = jwt.sign(
        { id: result._id, email: result.email },
        "eufb43oihf38h4nf39f348hfniendifj930uj94jr4jf93-jfmciwenciosnoi",
        {
          expiresIn: "1h",
        }
      );

      

      return {
        ...result._doc,
        id: result._id,
        token,
      };
    },
  },
};

export { userResolvers };
