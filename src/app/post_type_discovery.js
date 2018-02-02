import compact from 'lodash.compact'
import head from 'lodash.head'

// Implementation Reference: https://indieweb.org/post-type-discovery

const NOTE = 'Note'
const ARTICLE = 'Article'

function killWhiteSpace (str) {
  return str.trim().replace(/  +/g, ' ')
}

function firstNonEmpty (arr) {
  return head(compact(arr))
}

export function discoverPostType2 (doc) {
  const props = doc.properties

  let name, content, summary, category

  // let's start with the easiest one
  category = properties.category

  // then content
  content = firstNonEmpty(properties.content) || firstNonEmpty(properties.summary) || null
  content = content ? killWhiteSpace(content) : null

  // then name
  name = properties.name ? firstNonEmpty(properties.name) : null
  name = name ? killWhiteSpace(name) : null

  if (name && content) {
    return {
      name,
      content,
      category,
      type: ARTICLE
    }
  } else {
    return {
      content,
      category,
      type: NOTE
    }
  }
}

export function discoverPostType (micropubDocument) {
  console.log(JSON.stringify(micropubDocument))

  let name, content, type
  const { properties } = micropubDocument
  const { category } = properties

  function result () {
    return {
      name,
      content,
      type,
      category
    }
  }

  // TODO: Add Steps 1-6 when posting the following types:
  // - 1. RSVP
  // - 2. Reply
  // - 3. Share
  // - 4. Favorite
  // - 5. Video
  // - 6. Photo

  // 7. If the post has a "content" property with a non-empty value,
  if (compact(properties.content).length > 0) {
    // Then use its first non-empty value as the content
    content = compact(properties.content)
    // 8. Else if the post has a "summary" property with a non-empty value,
  } else if (compact(properties.summary).length > 0) {
    // Then use its first non-empty value as the content
    content = compact(properties.summary)[0]
  } else {
    // 9. Else it is a note post.
    type = NOTE
    return result()
  }

  // 10. If the post has no "name" property
  // or has a "name" property with an empty string value (or no value)
  // Then it is a note post.
  if (!properties.name || compact(properties.name).length > 0) {
    type = NOTE
    return result()
  }

  // 11. Take the first non-empty value of the "name" property
  // 12. Trim all leading/trailing whitespace
  // 13. Collapse all sequences of internal whitespace to a single space (0x20) character each
  name = killWhiteSpace(compact(properties.name)[0])

  // 14. Do the same with the content
  content = killWhiteSpace(content)

  // 15. If this processed "name" property value is NOT a prefix of the processed content,
  // Then it is an article post.
  if (!content.startsWith(name)) {
    type = ARTICLE
    return result()
  } else {
    type = NOTE
    return result()
  }
}
