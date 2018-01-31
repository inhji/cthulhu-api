import { discoverPostType } from './post_type_discovery'
import { Note, Article } from '../api/post/model'
import User from '../api/user/model'
import { generatePermalink } from './permalinks'

export async function micropubHandler (micropubDocument, req) {
  const { type, name, content } = discoverPostType(micropubDocument)
  const user = await User.findOne()
  const author = user._id

  if (type === 'Note') {
    const note = new Note({ author, content })
    await note.save()
    const url = generatePermalink({ hashid: note.hashid, type })
    req.log.info(`Micropub note created - url is: ${url}`)

    return Promise.resolve({ url })
  } else if (type === 'Article') {
    const article = new Article({ author, content, name })
    await article.save()
    const url = generatePermalink({ hashid: article.hashid, type })

    return Promise.resolve({ url })
  } else {
    return Promise.reject()
  }
}
