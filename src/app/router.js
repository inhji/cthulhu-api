import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { schema } from '../api/graphql'
import { formatError } from 'apollo-errors'

const router = express.Router()

router.use(
  '/graphql',
  graphqlExpress(req => ({
    schema,
    formatError,
    context: { user: req.user }
  }))
)
router.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

export default router
