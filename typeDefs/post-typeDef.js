const postType_defs = `
    type Post{
        id:ID!
        body:String!
        username:String!
    }

    type Query {
        getPosts:[Post]
    }

`;

export { postType_defs };
