require('dotenv-safe').config()
const request = require('supertest')

module.exports = async function getCookie (server) {
  const agent = request.agent(server)
  const res = await agent.post('/login').send({
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASS
  })

  return res.headers['set-cookie'][0]
}
