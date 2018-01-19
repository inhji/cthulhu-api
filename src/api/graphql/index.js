import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLDateTime } from 'graphql-iso-date'

import * as habitMutations from '../habit/mutations'
import * as userMutations from '../user/mutations'

import * as habitQueries from '../habit/queries'
import * as userQueries from '../user/queries'
import * as trackQueries from '../track/queries'

import userTypes from '../user/types'
import habitTypes from '../habit/types'
import trackTypes from '../track/types'

import cachedResolver from '../cached_resolver'

const typeDefs = /* GraphQL */ `
  scalar DateTime

  type Query {
    habits: [Habit]
    habit(id: ID!): Habit
    users: [User]
    user: User
    tracks: [Track]
  }

  type Mutation  {
    noop: ID
  }
`

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    ...trackQueries,
    ...habitQueries,
    ...userQueries
  },
  Mutation: {
    ...habitMutations,
    ...userMutations,
    // noop works as placeholder because type Mutation cannot be empty.
    // this way we can extend Mutation from other models.
    noop: () => null
  }
}

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs, userTypes, habitTypes, trackTypes],
  resolvers
})
