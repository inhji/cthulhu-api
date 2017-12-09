import mongoose from 'mongoose'

mongoose.Promise = global.Promise

export const connect = () => {
  const connectionString = process.env.MONGO_CONNECTION

  return new Promise((resolve, reject) => {
    mongoose.connect(connectionString, {
      useMongoClient: true
    })

    const connection = mongoose.connection

    connection.on('error', reject)
    connection.once('open', resolve)
  })
}
