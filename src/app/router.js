import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import micropub from 'micropub-express'
import jwt from 'express-jwt'
import { formatError } from 'apollo-errors'
import { schema } from '../api/graphql'
import { micropubHandler } from './micropub_handler'
import lazymention from 'lazymention'

const router = express.Router()
const lazymentionRouter = lazymention.makeRouter(lazymention.persistence(__dirname))
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
  '/webmention',
  (req, res, next) => {
    // Configure lazymention here
    req.config = {
      domains: ['inhji.de']
    }
    next()
  },
  lazymentionRouter
)

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
  jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false
  }),
  graphqlExpress(req => ({
    schema,
    formatError,
    context: { user: req.user, dev, log: req.log }
  }))
)
router.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

export default router
