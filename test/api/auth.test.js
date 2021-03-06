/* eslint-env jest */
require('dotenv-safe').config()
const request = require('supertest')
const server = require('../test-server')()
const getCookie = require('../cookie-helper')

const loginData = {
  real: {
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASS
  },
  fake: {
    email: 'foo@bar.baz',
    password: '123456lol'
  }
}

describe('Test /login', () => {
  test('It should return 400 if email is missing', async () => {
    const res = await request(server)
      .post('/login')
      .send({
        email: loginData.fake.email
      })
    expect(res.statusCode).toBe(400)
  })

  test('It should return 400 if password is missing', async () => {
    const res = await request(server)
      .post('/login')
      .send({
        password: loginData.fake.password
      })
    expect(res.statusCode).toBe(400)
  })

  test('It should return 403 if user does not exist', async () => {
    const res = await request(server)
      .post('/login')
      .send({
        email: loginData.fake.email,
        password: loginData.fake.password
      })
    expect(res.statusCode).toBe(403)
  })

  test('It should return 403 if user does exist but password is wrong', async () => {
    const res = await request(server)
      .post('/login')
      .send({
        email: loginData.real.email,
        password: '123456'
      })
    expect(res.statusCode).toBe(403)
  })

  test('It should return 200 with cookie and userid in the body if login successful', async () => {
    const res = await request(server)
      .post('/login')
      .send({
        email: loginData.real.email,
        password: loginData.real.password
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
    const { cookie } = await getCookie(server)
    const res = await agent.post('/loggedin').set('Cookie', cookie)

    expect(res.statusCode).toBe(200)
  })
})

describe('Test /logout', () => {
  const agent = request.agent(server)

  test('It should return 200 and delete the cookie', async () => {
    const res = await agent.post('/logout')

    expect(res.statusCode).toBe(200)
    expect(res.headers['set-cookie']).toBeTruthy()
    expect(res.headers['set-cookie'][0]).toMatch(/^CTHULHU_SESSION=;/)
  })
})
