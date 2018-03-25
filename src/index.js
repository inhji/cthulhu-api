import { connect } from './database'
import logger from './logger'
import app from './app'
const port = process.env.PORT

export async function start () {
  try {
    await connect()
    logger.info('Database connected')

    app.listen(port)

    logger.info(`Cthulhu API started!`)
    logger.info(`URL: http://localhost:${port}`)
  } catch (e) {
    console.error(e)
    logger.error(`Error while starting server: ${e.message}`)
  }
}
