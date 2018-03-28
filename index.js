try {
  require('dotenv-safe').config()
  require('babel-polyfill')
  require('babel-register')({
    presets: ['env'],
    plugins: ['transform-object-rest-spread']
  })

  const { start } = require('./src')

  start()
} catch (e) {
  console.error(e.message)
}
