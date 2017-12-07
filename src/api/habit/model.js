import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema
const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: String,

    isGood: { type: Boolean, default: false },
    threshold: { type: Number, default: 0 },

    logs: [Date],

    author: { type: ObjectId, ref: 'User', required: true }
  },
  // usePushEach prevents mongoose bug with deprecated $pushAll
  // operation when pushing to logs array like
  // habit.logs.push(log)
  // See: https://github.com/Automattic/mongoose/issues/4455
  { timestamps: true, usePushEach: true }
)

export default mongoose.model('Habit', schema)
