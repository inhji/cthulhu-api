import { discoverPostType } from './post_type_discovery'
import { Note, Article, Bookmark } from '../api/post/model'
import User from '../api/user/model'
import { generatePermalink } from './permalinks'

const createNote = async ({ author, content, category }) => {
  const note = new Note({ author, content, tags: category })
  return note.save()
}

const createArticle = async ({ author, name, content, category }) => {
  const article = new Article({ author, content, title: name, tags: category })
  return await article.save()
}

const createBookmark = async ({ author, name, content, category, bookmarkOf }) => {
  const bookmark = new Bookmark({ author, content, title: name, tags: category, url: bookmarkOf })
  return await bookmark.save()
}

export async function micropubHandler (micropubDocument, req) {
  req.log.info('Handling MicropubDocument:', { data: micropubDocument })

  const { type, name, content, category, bookmarkOf } = discoverPostType(micropubDocument)
  const author = (await User.findOne())._id

  let post

  switch (type) {
    case 'Note':
      post = await createNote({ author, content, category })
      break
    case 'Article':
      post = await createArticle({ author, name, content, category })
      break
    case 'Bookmark':
      post = await createBookmark({ author, name, content, category, bookmarkOf })
      break
    default:
      // Unknown post type
      return Promise.reject()
  }

  const url = generatePermalink({ hashid: post.hashid, type })

  return Promise.resolve({ url })
}
