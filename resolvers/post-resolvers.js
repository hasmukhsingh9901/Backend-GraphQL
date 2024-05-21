import { Post } from "../models/post-model.js";
import { AuthenticationError } from "apollo-server-express";
import auth_context from "../utils/check-auth.js";

const post_resolver = {
  Query: {
    getPosts: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError("You must be logged in to view posts.");
      }
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    getPost: async (_, { postId }, { user }) => {
      if (!user) {
        throw new AuthenticationError("You must be logged in to view a post.");
      }
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
        console.log("Post user", user);
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
  },
};

export { post_resolver };
