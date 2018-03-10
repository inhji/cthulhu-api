import mongoose, { Schema } from 'mongoose'
import { autoIncrement } from 'mongoose-plugin-autoinc'
import { hashidHook, markdownHook } from './hooks'
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
schema.pre('save', hashidHook)

const Post = mongoose.model('Post', schema)

const noteSchema = new Schema({
  content: String,
  contentHtml: String
})

noteSchema.pre('save', markdownHook)

const articleSchema = new Schema({
  title: String,
  content: String,
  contentHtml: String
})

articleSchema.pre('save', markdownHook)

const bookmarkSchema = new Schema({
  title: String,
  content: String,
  contentHtml: String,
  url: String
})

bookmarkSchema.pre('save', markdownHook)

export const Note = Post.discriminator('Note', noteSchema)
export const Article = Post.discriminator('Article', articleSchema)
export const Bookmark = Post.discriminator('Bookmark', bookmarkSchema)
export default Post
