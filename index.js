import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import dotenv from "dotenv";
import { connectDatabase } from "./database/connect-db.js";
import { mergedType_defs } from "./typeDefs/index.js";
import { merged_resolvers } from "./resolvers/index.js";
import { context } from "./utils/context.js";


dotenv.config();

connectDatabase();

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: mergedType_defs,
    resolvers: merged_resolvers,
    introspection: true, // Enable introspection
    context,
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan("dev"));

  await server.start();
  app.use("/graphql", expressMiddleware(server));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}

startServer();
