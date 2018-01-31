import path from 'path'

export function generatePermalink ({ hashid, type }) {
  return path.join(`${process.env.PUBLIC_URL}`, type.toLowerCase(), hashid)
}
