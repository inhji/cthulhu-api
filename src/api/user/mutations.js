import { isInstance } from 'apollo-errors'
import User from './model'
import { baseResolver, userExistsResolver } from '../resolvers'
import { InvalidCredentialsError, UserExistsError } from '../errors'

export const registerUser = userExistsResolver.createResolver(
  async (_, { name, email, password }, context) => {
    const user = await new User({ name, email, password }).save()
    const token = user.createToken()
    return { id: user._id, token }
  }
)

export const authenticateUser = baseResolver.createResolver(
  async (_, { email, password }) => {
    const user = await User.findOne({ email })

    if (!user) 
      throw new InvalidCredentialsError()

    const validPassword = await user.validPassword(password)

    if (!validPassword)
      throw new InvalidCredentialsError()

    const token = user.createToken()

    return {
      id: user._id,
      token
    }
  }
)