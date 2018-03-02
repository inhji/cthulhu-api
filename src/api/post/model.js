import mongoose, { Schema } from 'mongoose'
import { autoIncrement } from 'mongoose-plugin-autoinc'
import { postHook, noteHook } from './hooks'
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
schema.pre('save', postHook)

const Post = mongoose.model('Post', schema)

const noteSchema = new Schema({
  content: String
})

noteSchema.pre('save', noteHook)

const articleSchema = new Schema({
  title: String,
  content: String
})

const bookmarkSchema = new Schema({
  title: String,
  content: String,
  url: String
})

export const Note = Post.discriminator('Note', noteSchema)
export const Article = Post.discriminator('Article', articleSchema)
export const Bookmark = Post.discriminator('Bookmark', bookmarkSchema)
export default Post
