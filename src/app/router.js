import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import micropub from 'micropub-express'
import jwt from 'express-jwt'
import { formatError } from 'apollo-errors'
import cookieParser from 'cookie-parser'
import { schema } from '../api/graphql'
import { micropubHandler } from './micropub_handler'
import User from '../api/user/model'

const router = express.Router()
const dev = process.env.NODE_ENV !== 'production'

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
  cookieParser(),
  jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
    getToken: req => {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
      } else if (req.cookies && req.cookies[process.env.COOKIE_NAME]) {
        return req.cookies[process.env.COOKIE_NAME]
      }

      return null
    }
  }),
  graphqlExpress(req => ({
    schema,
    formatError,
    context: { user: req.user, dev, log: req.log }
  }))
)
router.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.sendStatus(400).json({
      error: 'Missing Credentials'
    })
  }

  const user = await User.findOne({ email })

  if (!user) {
    return res.sendStatus(403).json({
      error: 'Invalid Credentials'
    })
  }

  const validPassword = await user.validPassword(password)

  if (!validPassword) {
    return res.sendStatus(403).json({
      error: 'Invalid Credentials'
    })
  }

  const token = user.createToken()

  res.cookie(process.env.COOKIE_NAME, token, {
    httpOnly: true,
    secure: !dev,
    maxAge: 604800000 // 7 days
  })

  res.sendStatus(200)
})

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

export default router
