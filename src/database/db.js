import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      autoIndex: true,
    });
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDatabase;
