import { createLogger, format, transports } from 'winston'
const { combine, timestamp, colorize, simple, printf } = format

const myFormat = printf(info => {
  return `${info.timestamp} [${info.level}]: ${info.message} ${JSON.stringify(info.data) || ''}`
})

const logger = createLogger({
  format: combine(colorize(), timestamp(), myFormat),
  transports: [new transports.Console()]
})

logger.stream = {
  write: function (message, encoding) {
    logger.info(message)
  }
}

export default logger
