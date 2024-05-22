import { Post } from "../models/post-model.js";
import auth_context from "../utils/check-auth.js";

const comment_resolver = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = auth_context(context);
      if (body.trim() === "") {
        throw new Error("Empty comment");
      }

      const post = await Post.findById(postId);
      if (!post.comments) {
        post.comments = [];
      }

      // Add the new comment
      post.comments = [
        {
          body,
          username,
        },
        ...post.comments,
      ];

      // Save the post
      await post.save();
      return post;
    },
  },
};

export { comment_resolver };
