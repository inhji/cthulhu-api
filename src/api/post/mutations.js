import { Note, Article, Bookmark } from './model'

export const createNote = (_, { content }, { user, dev }) => {
  const author = user._id
  const note = new Note({ content, author })
  return note.save()
}

export const createArticle = (_, { title, content }, { user }) => {
  const author = user._id
  const article = new Article({ title, content, author })
  return article.save()
}

export const createBookmark = (_, { url }, { user }) => {
  const author = user._id
  const bookmark = new Bookmark({ url, author })
  return bookmark.save()
}

export const updateNote = async (_, { id, ...fields }, { user, dev }) => {
  const note = await Note.findById(id)
  Object.assign(note, fields)
  await note.save()

  return Note.findById(id).exec()
}

export const updateBookmark = async (_, { id, ...fields }, { user, dev }) => {
  const bookmark = await Bookmark.findById(id)
  Object.assign(bookmark, fields)
  await bookmark.save()

  return Bookmark.findById(id).exec()
}

export const deleteNote = async (_, { id }, { user }) => {
  await Note.findByIdAndRemove(id)

  return { id }
}

export const deleteBookmark = async (_, { id }, { user }) => {
  await Bookmark.findByIdAndRemove(id)

  return { id }
}
