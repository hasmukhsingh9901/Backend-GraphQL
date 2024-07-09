import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import connectDatabase from "./database/db.js";
import { mergedResolvers } from "./graphQL/resolvers/index.js";
import context from "./utils/context.js";
import { mergedTypeDefs } from "./graphQL/schema/index.js";


dotenv.config();

export const { SECRET_KEY } = process.env;

connectDatabase();

async function startServer() {
  const app = express();

  // Apply middleware
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const server = new ApolloServer({
    typeDefs:mergedTypeDefs,
    resolvers:mergedResolvers,
    introspection: true,
    context:context
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}

startServer();
