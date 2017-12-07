import express from 'express'
import jwt from 'express-jwt'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './router'
import { connect } from '../database'

export const start = async () => {
  try {
    await connect()
    console.log('> Database Connected')

    const app = express()

    app.use(bodyParser.json())
    app.use(cors({ origin: true }))
    app.use(
      jwt({
        secret: process.env.JWT_SECRET,
        credentialsRequired: false
      })
    )

    app.use('/', router)
    app.listen(3000)
    console.log('> Server Connected')
    console.log('> Running on port 3000')
  } catch (e) {
    console.log('! Something went wrong')
    console.log(e)
  }
}
