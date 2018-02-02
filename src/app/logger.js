import { createLogger, format, transports } from 'winston'
const { combine, colorize, simple } = format

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      format: combine(colorize(), simple())
    })
  ]
})

export default logger
