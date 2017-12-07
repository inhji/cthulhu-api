import mongoose from 'mongoose'

mongoose.Promise = global.Promise

export const connect = () => {
  const url = process.env.MONGO_CONNECTION
  const db = process.env.MONGO_DATABASE

  return new Promise((resolve, reject) => {
    mongoose.connect(`${url}/${db}`, {
      useMongoClient: true
    })

    const connection = mongoose.connection

    connection.on('error', reject)
    connection.once('open', resolve)
  })
}
