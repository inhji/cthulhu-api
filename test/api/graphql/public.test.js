/* eslint-env jest */
require('dotenv-safe').config()
const request = require('supertest')
const server = require('../../test-server')()

describe('Test /graphql', () => {
  test('It should return 200', async () => {
    const res = await request(server).get('/')
    expect(res.statusCode).toBe(200)
  })
})
