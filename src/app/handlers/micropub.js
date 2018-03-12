import { discoverPostType } from '../post_type_discovery'
import User from '../../api/user/model'
import { generatePermalink } from '../permalinks'
import {createNote, createArticle, createBookmark} from '../create'

export async function micropubHandler (micropubDocument, req) {
  req.log.info('Handling MicropubDocument:', { data: micropubDocument })

  const { type, name, content, category, bookmarkOf } = discoverPostType(
    micropubDocument
  )
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
      post = await createBookmark({
        author,
        name,
        content,
        category,
        bookmarkOf
      })
      break
    default:
      // Unknown post type
      return Promise.reject(new Error('This post type is not implemented yet'))
  }

  const url = generatePermalink({ hashid: post.hashid, type })

  return Promise.resolve({ url })
}
