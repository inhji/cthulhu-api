import express from 'express'
import bodyParser from 'body-parser'
import errorHandler from 'errorhandler'
import morgan from 'morgan'
import cors from 'cors'
import router from './router'
import logger from './logger'
import { connect } from '../database'

export const start = async () => {
  try {
    await connect()
    logger.info('Database connected')

    const app = express()
    const port = process.env.PORT
    const dev = process.env.NODE_ENV === 'development'

    app.use((req, res, next) => {
      req.log = logger
      next()
    })
    app.use(cors(true))
    // Pipe morgan output into winston :)
    app.use(morgan('dev', { stream: logger.stream }))
    app.use(bodyParser.json())
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

    logger.info(`Cthulhu API started on port ${port}`)
  } catch (e) {
    logger.error(`Error while starting server: ${e.message}`)
  }
}
