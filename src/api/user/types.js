export default /* GraphQL */ `
  type User {
    id: ID!

    name: String!
    email: String!

    createdAt: DateTime
    updatedAt: DateTime
  }

  type AuthPayload {
    id: ID!
    token: String!
  }

  extend type Mutation {
    registerUser(email: String!, password: String!, name: String!): AuthPayload
    authenticateUser(email: String!, password: String!): AuthPayload
  }
`
