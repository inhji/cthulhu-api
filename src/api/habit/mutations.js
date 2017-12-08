import { authenticationRequiredResolver } from '../resolvers'
import { HabitNotFoundError } from '../errors'

const habitNotFoundResolver = authenticationRequiredResolver.createResolver(
  async (_, { habitId, ...rest }) => {
    const habit = await Habit.findById(habitId)

    if (!habit) {
      return new HabitNotFoundError()
    }
  }
)

export const createHabit = authenticationRequiredResolver.createResolver(
  (_, { author, name, description, isGood, threshold, days }) => {
    const habit = new Habit({ name, description, isGood, threshold, days, author })
    return habit.save()
  }
)

export const updateHabit = habitNotFoundResolver.createResolver(
  async (_, { id, name, description, isGood, threshold }) => {
    const habit = await Habit.findById(id)
    habit.name = name || habit.name
    habit.description = description || habit.description
    habit.isGood = isGood || habit.isGood
    habit.threshold = threshold || habit.threshold
    return habit.save()
  }
)

export const deleteHabit = habitNotFoundResolver.createResolver(async (_, { id }) => {
  return Habit.findByIdAndRemove(id)
})

export const createHabitLog = habitNotFoundResolver.createResolver(async (_, { id }) => {
  const habit = await Habit.findById(id)
  habit.logs.push(new Date())
  return habit.save()
})
