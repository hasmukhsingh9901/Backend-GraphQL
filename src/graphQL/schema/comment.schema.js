const commentTypeDefs = `#graphql
  type Comment {
    id: ID!
    author: User!
    content: String!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }
`;

export { commentTypeDefs };
