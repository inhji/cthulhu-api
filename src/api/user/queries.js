import User from './model'
import { authenticationRequiredResolver } from '../resolvers'

export const user = async (_, params, { user }) => {
  const user = User.findById(user.id)
  return user
}
