import { createError, isInstance } from 'apollo-errors'

export const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occurred! Please try again later'
})

export const AuthenticationRequiredError = createError('AuthenticationRequiredError', {
  message: 'You must be logged in to do this'
})

export const UserExistsError = createError('UserExistsError', {
  message: 'User already exists'
})

export const InvalidCredentialsError = createError('InvalidCredentialsError', {
  message: 'Invalid Credentials'
})

export const HabitNotFoundError = createError('HabitNotFoundError', {
  message: 'Habit does not exist'
})
