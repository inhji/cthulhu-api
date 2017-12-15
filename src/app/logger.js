import { createLogger, format, transports } from 'winston'
const { combine, timestamp, prettyPrint, label, printf, json } = format

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    printf(info => {
      return `${info.timestamp} ${info.level}: ${info.message}`
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'log/error.log',
      level: 'error'
    }),
    new transports.File({
      filename: 'log/combined.log'
    })
  ]
})

export default logger
