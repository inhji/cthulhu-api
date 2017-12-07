import Habit from './model'

export const habits = async (_, params, ctx) => {
  const habits = await Habit.find()
  console.log(habits, ctx)
  return habits
}

export const habit = (_, { id }) => {
  return Habit.findById(id)
}
