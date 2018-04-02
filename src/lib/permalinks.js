export function generatePermalink ({ hashid, type }) {
  return `${process.env.PUBLIC_URL}/post/${hashid}`
}
