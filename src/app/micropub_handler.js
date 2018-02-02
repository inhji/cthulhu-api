import { discoverPostType } from './post_type_discovery'
import { Note, Article } from '../api/post/model'
import User from '../api/user/model'
import { generatePermalink } from './permalinks'

const createMicropubNote = async ({ author, name, content, category }) => {
  const note = new Note({ author, content, tags: category })
  await note.save()
  const url = generatePermalink({ hashid: note.hashid, type: 'note' })

  return Promise.resolve({ url })
}

export async function micropubHandler (micropubDocument, req) {
  req.log.info('Handling MicropubDocument:', { data: micropubDocument })

  const { type, name, content, category } = discoverPostType(micropubDocument)
  const user = await User.findOne()
  const author = user._id

  if (type === 'Note') {
    return createMicropubNote({ author, name, content, category })
  } else if (type === 'Article') {
    const article = new Article({ author, content, name })
    await article.save()
    const url = generatePermalink({ hashid: article.hashid, type })

    return Promise.resolve({ url })
  } else {
    return Promise.reject()
  }
}
