import Post from './model'

export const posts = async () => {
  return Post.find()
    .populate('author')
    .exec()
}

export const post = (_, { id }) => {
  return Post.findOne({ _id: id })
    .populate('author')
    .exec()
}
