import { mergeResolvers } from "@graphql-tools/merge";
import { post_resolver } from "./post-resolvers.js";
import { user_resolver } from "./user-resolvers.js";
import { comment_resolver } from "./comment-resolver.js";

const merged_resolvers = mergeResolvers([
  user_resolver,
  post_resolver,
  comment_resolver,
]);

export { merged_resolvers };
