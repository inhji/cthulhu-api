import Post from './model'

export const posts = async () => {
  return Post.find()
    .sort({ createdAt: 'desc' })
    .populate('author')
    .exec()
}

export const post = (_, { id }) => {
  return Post.findOne({ _id: id })
    .populate('author')
    .exec()
}

export const postByHashid = (_, { hashid }) => {
  return Post.findOne({ hashid: hashid })
    .populate('author')
    .exec()
}
