import { Post } from "../models/post-model.js";
import { AuthenticationError } from "apollo-server-express";
import authContext from "../utils/check-auth.js";

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
        const user = await authContext(context);
        if (body.trim() === "") {
          throw new Error("Post body must not be empty");
        }
        const newPost = new Post({
          body,
          username: user.username || "",
          userId: user.id,
        });
        const savedPost = await newPost.save();
        context.pubsub.publish("NEW_POST", {
          newPost: savedPost,
        });
        return savedPost;
      } catch (error) {
        throw new Error(error);
      }
    },
    deletePost: async (_, { postId }, context) => {
      try {
        const user = await authContext(context);

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
    likePost: async (_, { postId }, context) => {
      try {
        const { username } = await authContext(context);
        const post = await Post.findById(postId);

        if (post) {
          if (post.likes.find((like) => like.username === username)) {
            // Post already liked, unlike it
            post.likes = post.likes.filter(
              (like) => like.username !== username
            );
          } else {
            // Not liked, like it
            post.likes.push({ username });
          }
          await post.save();
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    // Subscription: {
    //   newPost: { 
    //     subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    //   },
    // },
  },
};

export { post_resolver };
