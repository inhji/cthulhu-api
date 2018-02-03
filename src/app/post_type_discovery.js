import compact from 'lodash.compact'
import head from 'lodash.head'

// Implementation Reference: https://indieweb.org/post-type-discovery

const NOTE = 'Note'
const ARTICLE = 'Article'
const BOOKMARK = 'Bookmark'

function killWhiteSpace (str) {
  return str.trim().replace(/  +/g, ' ')
}

function firstNonEmpty (arr) {
  return head(compact(arr))
}

export function discoverPostType (doc) {
  const props = doc.properties

  let name, content, summary, category, bookmarkOf

  category = props.category

  bookmarkOf = props['bookmark-of'] || null

  content = firstNonEmpty(props.content) || firstNonEmpty(props.summary) || null
  content = content ? killWhiteSpace(content) : null

  name = props.name ? firstNonEmpty(props.name) : null
  name = name ? killWhiteSpace(name) : null

  if (bookmarkOf) {
    return {
      name,
      content,
      category,
      bookmarkOf,
      type: BOOKMARK
    }
  } else if (name && content) {
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
