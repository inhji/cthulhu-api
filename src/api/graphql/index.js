import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLDateTime } from 'graphql-iso-date'

import * as habitMutations from '../habit/mutations'
import * as userMutations from '../user/mutations'

import * as habitQueries from '../habit/queries'
import * as userQueries from '../user/queries'

const typeDefs = /* GraphQL */ `
  scalar DateTime

  type Habit {
    id: ID!

    name: String!
    description: String

    days: Int

    isGood: Boolean
    threshold: Int

    logs: [DateTime]

    createdAt: DateTime
    updatedAt: DateTime
  }

  type DeleteHabitPayload {
    id: ID!
  }

  type User {
    id: ID!

    name: String!
    password: String!

    createdAt: DateTime
    updatedAt: DateTime
  }

  type AuthPayload {
    id: ID!
    token: String!
  }

  type Query {
    habits: [Habit]
    habit(id: ID!): Habit
    user(): User
  }

  type Mutation {
    createHabit (authorId: ID!, name: String!, description: String, isGood: Boolean, threshold: Int): Habit
    updateHabit(id: ID!, name: String, description: String, isGood: Boolean, threshold: Int): Habit
    deleteHabit(id: ID!): DeleteHabitPayload,
    createHabitLog (id: ID!): Habit
    registerUser(email: String!, password: String!, name: String!): AuthPayload
    authenticateUser(email: String!, password: String!): AuthPayload
  }
`

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    ...habitQueries,
    ...userQueries
  },
  Mutation: {
    ...habitMutations,
    ...userMutations
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
