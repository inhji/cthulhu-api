import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const schema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    password: String
  },
  { timestamps: true }
)

schema.methods.validPassword = function (password) {
  return bcrypt.compare(password, this.password)
}

schema.methods.hashPassword = async function () {
  const SALT_ROUNDS = 10
  const hash = await bcrypt.hash(this.password, SALT_ROUNDS)

  return hash
}

schema.methods.createToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email
    },
    process.env.JWT_SECRET
  )
}

schema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await this.hashPassword()
  }

  next()
})

export default mongoose.model('User', schema)
