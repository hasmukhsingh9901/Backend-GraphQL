import { mergeTypeDefs } from "@graphql-tools/merge";
import { userType_defs } from "./user-typeDef.js";
import { postType_defs } from "./post-typeDef.js";

const mergedType_defs = mergeTypeDefs([userType_defs, postType_defs]);

export { mergedType_defs };
