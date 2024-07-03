const userTypeDefs = `#graphql
  type User {
 
    username: String!
    email: String!
    fullName: String!
    avatar: String!
    password: String!
    posts: [Post!]!
    refreshToken: String
    createdAt: String!
    updatedAt: String!
  }



  type Query {
    users: [User!]!
  }
  type Mutation {
    registerUser(input: RegisterInput!): User!
  }

  input RegisterInput{
    username:String!
    email:String!
    fullName:String!
    avatar:String!
    password:String!
    confirmPassword:String!
  }

`;

export { userTypeDefs };
