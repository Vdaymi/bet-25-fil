const { buildSchema } = require('graphql');
const schema = buildSchema(`
  type Image {
    _id: ID!
    name_image: String!
    author: String!
    text: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getImage(_id: ID!): Image
    getAllImages: [Image]
  }

  type Mutation {
    createImage(name_image: String!, author: String!, text: String!): Image
    updateImage(_id: ID!, name_image: String!, author: String!, text: String!): Image
    deleteImage(_id: ID!): Boolean
  }
`);

module.exports = schema;