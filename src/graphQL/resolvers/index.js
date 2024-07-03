import { postResolvers } from "./posts.js";
import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./user.js";

const mergedResolvers = mergeResolvers([postResolvers, userResolvers]);

export { mergedResolvers };
