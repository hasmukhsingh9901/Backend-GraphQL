const postType_defs = `#graphql
    type Post{
        id:ID!
        body:String!
        username:String!
    }

    type Query {
        getPosts:[Post]
        getPost(postId:ID!):Post
    }

    type Mutation{
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
    }

    
`;

export { postType_defs };
