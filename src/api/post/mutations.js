import { Note, Article, Bookmark } from './model'

export const createNote = (_, { content }, { user, dev }) => {
  // HACK: dont require author field if we're in dev mode
  if (dev) {
    const note = new Note({ content })
    return note.save()
  }

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

export const updateNote = async (_, { id, ...fields }, {user, dev}) => {
  const note = await Note.findById(id)
  Object.assign(note, fields)
  await note.save()

  return Note.findById(id).exec()
}
