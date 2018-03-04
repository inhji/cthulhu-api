export default /* GraphQL */ `
  type Habit {
    id: ID!

    name: String!
    description: String

    days: Int
    isGood: Boolean
    threshold: Int
    logs: [DateTime]

    author: User

    createdAt: DateTime
    updatedAt: DateTime
  }

  type DeleteHabitPayload {
    id: ID!
  }


  extend type Mutation {
    createHabit(
      author: ID!,
      name: String!,
      description: String,
      isGood: Boolean,
      threshold: Int,
      days: Int
    ): Habit
    updateHabit(id: ID!,
      name: String,
      description: String,
      isGood: Boolean,
      threshold: Int,
      days: Int
    ): Habit
    deleteHabit(id: ID!): DeleteHabitPayload,
    createHabitLog (id: ID!): Habit
  }
`
