import { createLogger, format, transports } from 'winston'
const { combine, timestamp, prettyPrint, label, printf, json } = format

const consoleFormat = combine(
  timestamp(),
  printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`
  })
)

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console({ format: consoleFormat }),
    new transports.File({
      format: json(),
      filename: 'log/error.log',
      level: 'error'
    }),
    new transports.File({
      format: json(),
      filename: 'log/combined.log'
    })
  ]
})

export default logger
