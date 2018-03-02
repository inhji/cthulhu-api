import { Note, Article, Bookmark } from '../api/post/model'

export const createNote = async ({ author, content, category }) => {
  const note = new Note({ author, content, tags: category })
  return note.save()
}

export const createArticle = ({ author, name, content, category }) => {
  const article = new Article({ author, content, title: name, tags: category })
  return article.save()
}

export const createBookmark = ({ author, name, content, category, bookmarkOf }) => {
  const bookmark = new Bookmark({
    author,
    content,
    title: name,
    tags: category,
    url: bookmarkOf
  })
  return bookmark.save()
}
