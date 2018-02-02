import express from 'express'
import bodyParser from 'body-parser'
import errorHandler from 'errorhandler'
import cors from 'cors'
import router from './router'
import logger from './logger'
import { connect } from '../database'

export const start = async () => {
  try {
    await connect()

    const app = express()
    const port = process.env.PORT
    const dev = process.env.NODE_ENV === 'development'

    app.use((req, res, next) => {
      req.log = logger
      next()
    })
    app.use(bodyParser.json())
    app.use(cors({ origin: true }))
    app.use('/', router)
    app.use(
      dev
        ? errorHandler({ log: true })
        : (err, req, res, next) => {
          logger.error(err.stack)
          res.sendStatus(500).send('Something broke horribly!')
        }
    )

    app.listen(port)

    logger.info(`Cthulhu API started on port ${port}`, {
      foo: {
        bar: [1, 2, 3],
        baz: { lol: 'rofl' }
      }
    })
  } catch (e) {
    logger.error(`Error while starting server: ${e.message}`)
  }
}
