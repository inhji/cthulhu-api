import { createLogger, stdSerializers } from 'bunyan'

const logger = createLogger({
  name: 'app',
  serializers: stdSerializers,
  streams: [
    // Only log errors in test env
    process.env.NODE_ENV !== 'test'
      ? {
        stream: process.stdout,
        level: 'info'
      }
      : { stream: process.stdout, level: 'error' }
  ]
})
const reqLogger = logger.child({ component: 'req' })

logger.stream = {
  write: function (message, encoding) {
    const msg = message.trim().replace(/  +/g, ' ')
    reqLogger.info(msg)
  }
}

export default logger
