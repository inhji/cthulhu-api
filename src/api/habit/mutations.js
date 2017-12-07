import { authenticationRequiredResolver } from '../resolvers'

export const createHabit = authenticationRequiredResolver.createResolver(
  (_, { name, description, isGood, threshold }) => {
    const habit = new Habit({ name, description, isGood, threshold })
    return habit.save()
  }
)

export const createHabitLog = authenticationRequiredResolver.createResolver(
  async (_, { habitId }) => {
    const habit = await Habit.findById(habitId)
    habit.logs.push(new Date())
    return habit.save()
  }
)
