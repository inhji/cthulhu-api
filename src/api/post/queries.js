import Post from './model'

export const posts = async () => {
  return Post.find()
}

export const post = (_, { id }) => {
  return Post.findOne({ _id: id })
}
