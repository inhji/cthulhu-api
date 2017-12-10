import Habit from './model'

export const habits = async (_, params, ctx) => {
  return Habit
    .find()
    .populate('author')
    .exec()
}

export const habit = (_, { id }) => {
  return Habit
    .findById(id)
    .populate('author')
    .exec()
}
