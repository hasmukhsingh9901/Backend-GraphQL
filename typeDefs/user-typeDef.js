const userType_defs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
  }

  type Query {
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
