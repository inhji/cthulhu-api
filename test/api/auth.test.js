/* eslint-env jest */
require('dotenv').config()
const request = require('supertest')
const server = require('../test-server')()
// const server = require('../../src/app').default.listen()

describe('Test /login', () => {
  test('It should return 400 if email is missing', async () => {
    const res = await request(server)
      .post('/login')
      .send({
        email: 'foo@bar.baz'
      })
    expect(res.statusCode).toBe(400)
  })

  test('It should return 400 if password is missing', async () => {
    const res = await request(server)
      .post('/login')
      .send({
        password: 'lol'
      })
    expect(res.statusCode).toBe(400)
  })

  test('It should return 403 if user does not exist', async () => {
    const res = await request(server)
      .post('/login')
      .send({
        email: 'foo@bar.baz',
        password: 'lol'
      })
    expect(res.statusCode).toBe(403)
  })

  test('It should return 403 if user does exist but password is wrong', async () => {
    const res = await request(server)
      .post('/login')
      .send({
        email: 'johnnie@posteo.de',
        password: '123456'
      })
    expect(res.statusCode).toBe(403)
  })

  test('It should return 200 with a cookie and the user id in the body if login was successful', async () => {
    const res = await request(server)
      .post('/login')
      .send({
        email: 'johnnie@posteo.de',
        password: '271090lotd'
      })

    expect(res.statusCode).toBe(200)
    expect(res.headers['set-cookie']).toBeTruthy()
    expect(res.headers['set-cookie'][0]).toMatch(/^CTHULHU_SESSION=/)
    expect(res.body.id).toBeTruthy()
    expect(res.body.id).toHaveLength(24) // It's a MongoID
  })
})

describe('Test /loggedin', () => {
  const agent = request.agent(server)

  test('It should return 401 if no cookie was provided', async () => {
    const res = await agent.post('/loggedin')

    expect(res.statusCode).toBe(401)
  })

  test('It should return 200 and the userid if a valid cookie was provided', async () => {
    const res = await agent.post('/login').send({
      email: 'johnnie@posteo.de',
      password: '271090lotd'
    })

    const res2 = await agent.post('/loggedin').set('Cookie', res.headers['set-cookie'])

    expect(res2.statusCode).toBe(200)
  })
})
