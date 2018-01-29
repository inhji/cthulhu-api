import { discoverPostType } from './post_type_discovery'
import { Note, Article } from '../api/post/model'
import { User } from '../api/user/model'
import { generatePermalink } from './permalinks'

export async function micropubHandler (micropubDocument, req) {
  const { type, name, content } = discoverPostType(micropubDocument)
  const user = await User.findOne()
  const author = user._id

  if (type === 'Note') {
    const note = new Note({ author, content })
    await note.save()

    return Promise.resolve({ url: generatePermalink({ hashid: note.hashid, type }) })
  } else if (type === 'Article') {
    const article = new Article({ author, content, name })
    await article.save()

    return Promise.resolve({ url: generatePermalink({ hashid: note.hashid, type }) })
  } else {
    return Promise.reject()
  }
}
