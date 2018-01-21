import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema

const schema = new Schema(
  {
    tags: [String],
    author: { type: ObjectId, ref: 'User', required: true }
  },
  { discriminatorKey: 'type', timestamps: true }
)

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
    url: String
  })
)
