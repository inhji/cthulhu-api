import koaRouter from 'koa-router'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import { schema } from '../api/graphql'
import { formatError } from 'apollo-errors'

const router = new koaRouter()

const graphqlOptions = ctx => ({
  schema,
  // Format errors according to apollo-errors
  formatError,
  // Pass the user object from koaJwt to GraphQL
  context: { user: ctx.state.user }
})

router.post('/graphql', graphqlKoa(graphqlOptions))
router.get('/graphql', graphqlKoa(graphqlOptions))
router.get(
  '/graphiql',
  graphiqlKoa({
    endpointURL: '/graphql'
  })
)

export default router
