require('dotenv-safe').config()
const request = require('supertest')

module.exports = async function getCookie (server) {
  if (!server) {
    throw new Error("You need to provide 'server' to getCookie, you dumb fuck!")
  }

  const agent = request.agent(server)
  const res = await agent.post('/login').send({
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASS
  })

  return {
    cookie: res.headers['set-cookie'][0],
    userId: res.body.id
  }
}
