import { mergeResolvers } from "@graphql-tools/merge";
import { post_resolver } from "./post-resolvers.js";
import { user_resolver } from "./user-resolvers.js";

const merged_resolvers = mergeResolvers([user_resolver, post_resolver]);

export { merged_resolvers };
