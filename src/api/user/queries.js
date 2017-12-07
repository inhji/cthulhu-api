import User from './model'
import { authenticationRequiredResolver } from '../resolvers'

export const user = async (_, params, { user }) => {
  return User.findById(user.id)
}
