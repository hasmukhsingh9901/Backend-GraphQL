import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import { connectDatabase } from "./database/connect-db.js";
import { mergedType_defs } from "./typeDefs/index.js";
import { merged_resolvers } from "./resolvers/index.js";

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
    typeDefs: mergedType_defs,
    resolvers: merged_resolvers,
    introspection: true,
    context: ({ req }) => ({ req }),
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}

startServer();
