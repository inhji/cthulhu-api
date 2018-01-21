export default /* GraphQL */ `
  union Post = Note | Article | Bookmark

  type Note {
    id: ID!
    content: String

    tags: [String]
    author: User

    createdAt: DateTime
    updatedAt: DateTime
  }

  type Article {
    id: ID!
    title: String
    content: String

    tags: [String]
    author: User

    createdAt: DateTime
    updatedAt: DateTime
  }

  type Bookmark {
    id: ID!

    url: String

    tags: [String]
    author: User

    createdAt: DateTime
    updatedAt: DateTime
  }

  extend type Mutation {
    createNote (content: String!): Note
    createArticle (title: String!, content: String!): Article
    createBookmark(url: String!): Bookmark
  }
`
