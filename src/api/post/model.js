import mongoose, { Schema } from 'mongoose'
import { autoIncrement } from 'mongoose-plugin-autoinc'
import { generateHashid } from './hashids'

const { ObjectId } = Schema

const schema = new Schema(
  {
    tags: [String],
    author: { type: ObjectId, ref: 'User' },
    hashid: String
  },
  { discriminatorKey: 'type', timestamps: true }
)

schema.plugin(autoIncrement, { model: 'Post', field: 'counter' })
schema.pre('save', function () {
  const dateObj = new Date(this.createdAt)
  const hashid = generateHashid({ year: dateObj.getFullYear(), counter: this.counter })

  this.hashid = hashid
})

const Post = mongoose.model('Post', schema)

export default Post

export const Note = Post.discriminator(
  'Note',
  new Schema({
    content: String
  })
)

export const Article = Post.discriminator(
  'Article',
  new Schema({
    title: String,
    content: String
  })
)

export const Bookmark = Post.discriminator(
  'Bookmark',
  new Schema({
    title: String,
    content: String,
    url: String
  })
)
