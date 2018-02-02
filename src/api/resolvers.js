import { createResolver } from 'apollo-resolvers'
import { createError, isInstance } from 'apollo-errors'
import { UnknownError, AuthenticationRequiredError, UserExistsError } from './errors'

export const baseResolver = createResolver(
  // incoming requests will pass through this resolver like a no-op
  null,
  /*
    Only mask outgoing errors that aren't already apollo-errors,
    such as ORM errors etc
  */
  (root, args, { log }, error) => {
    log.warn(`Unknown Error occurred in BaseResolver:`, { data: error })
    if (isInstance(error)) {
      return error
    }

    return new UnknownError({
      data: {
        name: error.name
      }
    })
  }
)

export const userExistsResolver = baseResolver.createResolver(
  // incoming requests will pass through this resolver like a no-op
  null,
  /*
    This will only handle Errors when
    a unique constraint in user was violated
  */
  async (root, args, { log }, error) => {
    if ((error.name === 'MongoError', error.code === 11000)) {
      log.warn(`UserExistsError occurred:`, { data: error })
      return new UserExistsError()
    }
  }
)

export const authenticationRequiredResolver = baseResolver.createResolver(
  async (root, args, { user, log }) => {
    if (!user) {
      log.warn(`AuthenticationRequiredError occurred:`, { data: error })
      return new AuthenticationRequiredError()
    }
  }
)
