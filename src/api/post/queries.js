import Post from './model'

export const posts = async () => {
  return Post.find()
    .populate('author')
    .exec()
}

export const post = (_, { id }) => {
  return Post.findOne({ id: id })
    .populate('author')
    .exec()
}

export const postByHashid = (_, { hashid }) => {
  return Post.findOne({ hashid: hashid })
    .populate('author')
    .exec()
}
