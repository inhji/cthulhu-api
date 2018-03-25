export function generatePermalink ({ hashid, type }) {
  return `${process.env.PUBLIC_URL}/${type.toLowerCase()}/${hashid}`
}
