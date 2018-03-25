const app = require('../src/app').default
const { connect } = require('../src/database')

module.exports = function start () {
  connect()
  app.listen()

  return app
}
