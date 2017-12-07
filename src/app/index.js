import koa from 'koa'
import koaJwt from 'koa-jwt'
import koaBody from 'koa-body'

import { connect } from '../database'
import router from './router'

export const start = async () => {
  try {
    await connect()
    console.log('> Database Connected')

    const app = new koa()

    app.use(koaBody())
    app.use(
      // Checks for a JWT in the Authorization Header like:
      // Authorization: 'Bearer myjsonwebtoken'
      koaJwt({
        secret: process.env.JWT_SECRET,
        passthrough: true
      })
    )
    app.use(router.routes())
    app.use(router.allowedMethods())

    await app.listen(3000)
    console.log('> Server Connected')
    console.log('> Running on port 3000')
  } catch (e) {
    console.log('! Something went wrong')
    console.log(e)
  }
}
