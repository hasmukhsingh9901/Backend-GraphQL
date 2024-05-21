import { Post } from "../models/post-model.js";
import { AuthenticationError } from "apollo-server-express";
import auth_context from "../utils/check-auth.js";

const post_resolver = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      try {
        const user = await auth_context(context);
        if (body.trim() === "") {
          throw new Error("Post body must be empty");
        }
        const newPost = new Post({
          body,
          username: user.username || "",
          userId: user.id,
        });
        const savedPost = await newPost.save();
        return savedPost;
      } catch (error) {
        throw new Error(error);
      }
    },
    deletePost: async (_, { postId }, context) => {
      try {
        const user = await auth_context(context);

        const post = await Post.findById(postId);
        if (!post) {
          throw new Error("Post not found");
        }

        if (user.username === post.username) {
          await Post.deleteOne({ _id: postId });
          return "Post deleted!";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export { post_resolver };
