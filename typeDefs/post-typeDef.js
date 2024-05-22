const postType_defs = `#graphql
    type Post{
        id:ID!
        body:String!
        username:String!
        comments:[Comment]!
        likes:[Like]!
    }

    type Comment {
        id:ID!
        username:String!
        body:String!
    }

    type Like{
        id:ID!
        username:String!
    }

    type Query {
        getPosts:[Post]
        getPost(postId:ID!):Post
    }

    type Mutation{
        createPost(body: String!): Post!
        createComment(postId:String!,body:String!):Post!
        likePost(postId:ID!):Post!

        deletePost(postId: ID!): String!
        deleteComment(postId:ID!,commentId:ID!):Post!
    }

    
`;

export { postType_defs };
