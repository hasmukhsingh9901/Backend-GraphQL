const postTypeDefs = `#graphql
  type Post {
    id: ID!
    author: User!
    content: String!
    likes: [User!]!
    comments: [Comment!]!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getPosts: [Post!]!
  }

`;

export { postTypeDefs };
