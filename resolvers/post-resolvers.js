import { Post } from "../models/post-model.js";

const post_resolver = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export { post_resolver };
