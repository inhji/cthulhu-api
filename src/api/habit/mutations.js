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
  (_, { name, description, isGood, threshold }) => {
    const habit = new Habit({ name, description, isGood, threshold })
    return habit.save()
  }
)

export const updateHabit = habitNotFoundResolver.createResolver(
  async (_, { habitId, name, description, isGood, threshold }) => {
    const habit = await Habit.findById(habitId)
    habit.name = name || habit.name
    habit.description = description || habit.description
    habit.isGood = isGood || habit.isGood
    habit.threshold = threshold || habit.threshold
    return habit.save()
  }
)

export const deleteHabit = habitNotFoundResolver.createResolver(async (_, { habitId }) => {
  return Habit.findByIdAndRemove(habitId)
})

export const createHabitLog = habitNotFoundResolver.createResolver(async (_, { habitId }) => {
  const habit = await Habit.findById(habitId)
  habit.logs.push(new Date())
  return habit.save()
})
