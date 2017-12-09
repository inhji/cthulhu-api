import express from 'express'
import jwt from 'express-jwt'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './router'
import logger from './logger'
import { connect } from '../database'

export const start = async () => {
  try {
    await connect()

    const app = express()
    const port = process.env.PORT

    app.use(bodyParser.json())
    app.use(cors({ origin: true }))
    app.use(
      jwt({
        secret: process.env.JWT_SECRET,
        credentialsRequired: false
      })
    )

    app.use('/', router)
    app.listen(port)
    logger.info(`Server started on port ${port}`)
  } catch (e) {
    logger.error(`Error while starting server: ${e.message}` )
  }
}
