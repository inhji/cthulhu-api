import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { formatError } from 'apollo-errors'
import { schema } from '../api/graphql'

const dev = process.env.NODE_ENV !== 'production'

export const graphqlHandler = graphqlExpress(req => ({
  schema,
  formatError,
  context: { user: req.user, dev, log: req.log }
}))

export const graphiqlHandler = graphiqlExpress({ endpointURL: '/graphql' })
