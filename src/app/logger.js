import winston from 'winston'
import 'winston-loggly-bulk'

winston.add(winston.transports.Loggly, {
  token: '91727fbd-aad6-4451-9038-d1eb1866a971',
  subdomain: 'inhji',
  tags: ['Cthulhu', process.env.NODE_ENV],
  json: true
})

export default winston
