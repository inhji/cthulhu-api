/* eslint-env jest */
require('dotenv-safe').config()
const request = require('supertest')
const server = require('../../test-server')()
const getCookie = require('../../cookie-helper')

let habitId = null

describe('Habits', () => {
  describe('query habits', () => {
    test('It should return a list of habits', async () => {
      const query = `
        query {
          habits {
            id
          }
        }
      `
      const cookie = await getCookie(server)
      const res = await request(server)
        .post('/graphql')
        .set('cookie', cookie)
        .send({ query })

      expect(res.statusCode).toBe(200)
      expect(res.body.data.habits).toBeTruthy()
    })
  })

  describe('mutation createHabit', () => {
    test('It should add a habit and return its id', async () => {
      const query = `
        mutation M($userId: ID!) {
          createHabit(name: "TestHabit", author: $userId) {
            id
          }
        }
      `
      const { cookie, userId } = await getCookie(server)
      const res = await request(server)
        .post('/graphql')
        .set('cookie', cookie)
        .send({ query, variables: { userId } })

      expect(res.statusCode).toBe(200)
      expect(res.body.data.createHabit).toBeTruthy()
      expect(res.body.data.createHabit.id).toBeTruthy()

      habitId = res.body.data.createHabit.id
    })
  })

  describe('mutation addHabitLog', () => {
    test('It should add a log to an existing habit', async () => {
      const query = `
        mutation M($habitId: ID!) {
          createHabitLog(id: $habitId) {
            id
          }
        }
      `
      const { cookie } = await getCookie(server)
      const res = await request(server)
        .post('/graphql')
        .set('cookie', cookie)
        .send({ query, variables: { habitId } })

      expect(res.statusCode).toBe(200)
      expect(res.body.data.createHabitLog).toBeTruthy()
      expect(res.body.data.createHabitLog.id).toBeTruthy()
    })
  })
})
