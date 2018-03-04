export default /* GraphQL */ `
  union Post = Note | Article | Bookmark

  type Note {
    id: ID!
    content: String

    tags: [String]
    author: User
    hashid: String
    type: String

    createdAt: DateTime
    updatedAt: DateTime
  }

  type Article {
    id: ID!
    title: String
    content: String

    tags: [String]
    author: User
    hashid: String
    type: String


    createdAt: DateTime
    updatedAt: DateTime
  }

  type Bookmark {
    id: ID!
    url: String
    title: String
    content: String

    tags: [String]
    author: User
    hashid: String
    type: String


    createdAt: DateTime
    updatedAt: DateTime
  }

  type DeletePostPayload {
    id: ID!
  }

  extend type Mutation {
    createNote (content: String!): Note
    createArticle (title: String!, content: String!): Article
    createBookmark(url: String!): Bookmark
    updateNote(id: ID!, content: String!, tags: [String]!): Note
    deleteNote(id: ID!): DeletePostPayload
  }
`
