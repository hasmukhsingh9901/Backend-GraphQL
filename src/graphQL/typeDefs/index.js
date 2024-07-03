import { mergeTypeDefs } from "@graphql-tools/merge";
import { commentTypeDefs } from "./comment.typeDef.js";
import { postTypeDefs } from "./post.typeDef.js";
import { userTypeDefs } from "./user.typeDef.js";

const mergedTypeDefs = mergeTypeDefs([
  userTypeDefs,
  postTypeDefs,
  commentTypeDefs,
]);

export { mergedTypeDefs };
