import url from 'url'

export function generatePermalink ({ hashid, type }) {
  return url.resolve(`${process.env.BASE}`, type.toLowerCase(), hashid)
}
