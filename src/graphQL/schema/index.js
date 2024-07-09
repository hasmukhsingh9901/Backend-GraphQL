import { mergeTypeDefs } from "@graphql-tools/merge";
import { userTypeDefs } from "./user.schema.js";
import { postTypeDefs } from "./post.schema.js";
import { commentTypeDefs } from "./comment.schema.js";



const mergedTypeDefs = mergeTypeDefs([
  userTypeDefs,
  postTypeDefs,
  commentTypeDefs,
]);

export { mergedTypeDefs };
