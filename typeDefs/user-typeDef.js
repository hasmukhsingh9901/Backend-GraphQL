const userType_defs = `#graphql
  type User {
    id: ID!
    username: String!
    profilePicture:String
    email: String!
    token: String!
    createdAt: String!

  }

  type Query {
    getUsers:[User]
    getUser(id: ID!): User
  }

  type Mutation {
    register(registerInput: RegisterInput!): User!
    login(username:String!,password:String!):User!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

`;
export { userType_defs };
