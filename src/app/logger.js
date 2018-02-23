import {createLogger, stdSerializers} from 'bunyan'

const logger = createLogger({ name: 'app', serializers: stdSerializers })
const reqLogger = createLogger({ name: 'req', serializers: stdSerializers })

logger.stream = {
  write: function (message, encoding) {
    const msg = message.trim().replace(/  +/g, ' ')
    reqLogger.info(msg)
  }
}

export default logger
