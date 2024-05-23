import mongoose from "mongoose";
import { Post } from "../models/post-model.js";
import authContext from "../utils/check-auth.js";
import { AuthenticationError } from "apollo-server-express";

const comment_resolver = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = await (context);
      if (!username) {
        throw new AuthenticationError("Invalid user");
      }

      if (body.trim() === "") {
        throw new Error("Empty comment");
      }

      const post = await Post.findById(postId);
      if (!post) {
        throw new Error("Post not found");
      }

      const newComment = {
        id: new mongoose.Types.ObjectId(),
        body,
        username,
      };

      console.log("New comment:", newComment);

      if (!post.comments) {
        post.comments = [];
      }

      post.comments.unshift(newComment);

      await post.save();

      post.comments = post.comments.filter(
        (comment) => comment.username != null
      );

      return post;
    },
    // TODO:Refactor delete resolver
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = await authContext(context);
      console.log("Auth user:", username);
      if (!username) {
        throw new AuthenticationError("Invalid user");
      }

      const post = await Post.findById(postId);
      if (!post) {
        throw new Error("Post not found");
      }

      const commentIndex = post.comments.findIndex((c) => c.id === commentId);
      console.log(commentIndex);
      if (commentIndex === -1) {
        throw new Error("Comment not found");
      }

      if (post.comments[commentIndex].username === username) {
        post.comments.splice(commentIndex, 1);
        await post.save();
        return post;
      } else {
        throw new Error("Action not allowed");
      }
    },
  },
};

export { comment_resolver };
