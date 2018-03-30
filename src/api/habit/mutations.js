import Habit from './model'
import { authenticationRequiredResolver } from '../resolvers'
import { HabitNotFoundError } from '../errors'
import moment from 'moment'

const habitNotFoundResolver = authenticationRequiredResolver.createResolver(
  async (_, { id, ...rest }) => {
    const habit = await Habit.findById(id)

    if (!habit) {
      return new HabitNotFoundError()
    }
  }
)

export const createHabit = authenticationRequiredResolver.createResolver(
  async (_, { author, name, description, isGood, threshold, days }, context) => {
    console.log(_, author, context)
    const habit = new Habit({ name, description, isGood, threshold, days, author })
    await habit.save()

    return Habit.findById(habit._id)
      .populate('author')
      .exec()
  }
)

export const updateHabit = habitNotFoundResolver.createResolver(async (_, { id, ...fields }) => {
  const habit = await Habit.findById(id)
  Object.assign(habit, fields)
  await habit.save()

  return Habit.findById(id)
    .populate('author')
    .exec()
})

export const deleteHabit = habitNotFoundResolver.createResolver(async (_, { id }) => {
  await Habit.findByIdAndRemove(id)

  return { id }
})

export const createHabitLog = habitNotFoundResolver.createResolver(
  async (_, { id, daysOffset }) => {
    const habit = await Habit.findById(id)
    let date = moment()

    if (daysOffset) {
      date = date.subtract(daysOffset, 'days')
    }

    habit.logs.push(date.toDate())
    return habit.save()
  }
)
