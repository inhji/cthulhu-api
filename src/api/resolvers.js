import { createResolver } from 'apollo-resolvers'
import { createError, isInstance } from 'apollo-errors'
import { UnknownError, AuthenticationRequiredError, UserExistsError } from './errors'
import logger from '../app/logger'

export const baseResolver = createResolver(
  //incoming requests will pass through this resolver like a no-op
  null,
  /*
    Only mask outgoing errors that aren't already apollo-errors,
    such as ORM errors etc
  */
  (root, args, context, error) => {
    if (isInstance(error)) {
      return error
    }

    logger.error(`Unknown Error occurred in BaseResolver: ${error.name}`)
    return new UnknownError({
      data: {
        name: error.name
      }
    })
  }
)

export const userExistsResolver = baseResolver.createResolver(
  //incoming requests will pass through this resolver like a no-op
  null,
  /*
    This will only handle Errors when
    a unique constraint in user was violated
  */
  async (root, args, context, error) => {
    if ((error.name === 'MongoError', error.code === 11000)) {
      return new UserExistsError()
    }
  }
)

export const authenticationRequiredResolver = baseResolver.createResolver(
  async (root, args, { user }) => {
    if (!user) {
      return new AuthenticationRequiredError()
    }
  }
)
