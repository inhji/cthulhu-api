import request from 'supertest'

module.exports = async function getCookie (server) {
  const agent = request.agent(server)
  const res = await agent.post('/login').send({
    email: 'johnnie@posteo.de',
    password: '271090lotd'
  })

  return res.headers['set-cookie'][0]
}
