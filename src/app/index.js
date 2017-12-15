import express from 'express'
import jwt from 'express-jwt'
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

    app.use(bodyParser.json())
    app.use(cors({ origin: true }))
    app.use(
      jwt({
        secret: process.env.JWT_SECRET,
        credentialsRequired: false
      })
    )
    app.use('/', router)
    if (dev) {
      app.use(errorHandler({ log: true }))
    } else {
      app.use((err, req, res, next) => {
        logger.error(err.stack)
        res.sendStatus(500).send('Something broke horribly!')
      })
    }

    app.listen(port)

    logger.info(`Cthulhu API started on port ${port}`)
  } catch (e) {
    logger.error(`Error while starting server: ${e.message}`)
  }
}
