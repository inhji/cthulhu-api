import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import micropub from 'micropub-express'
import { formatError } from 'apollo-errors'
import { schema } from '../api/graphql'
import { micropubHandler } from './micropub_handler'

const router = express.Router()
const dev = process.env.NODE_ENV !== 'production'

router.get('/', (req, res) => {
  return res.send(
    `<div>
      <p>
        <span>This is Cthulhu API. Feel free to explore the </span>
        <a href="/graphiql">GraphQL Endpoint</a>
      </p>
    </div>`
  )
})

router.use(
  '/micropub',
  micropub({
    tokenReference: {
      me: process.env.PUBLIC_URL,
      endpoint: process.env.TOKEN_ENDPOINT
    },
    handler: micropubHandler
  })
)

router.use(
  '/graphql',
  graphqlExpress(req => ({
    schema,
    formatError,
    context: { user: req.user, dev }
  }))
)
router.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

export default router
