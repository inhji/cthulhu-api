import Hashids from 'hashids'

// Charset inspired by New Base 60 by tantek.com
// http://tantek.pbworks.com/w/page/19402946/NewBase60
const chars = 'abcdefghijkmnopqrstuvwxyzABCDEFGHIJKMNPQRSTUVWXYZ1234567890_'
const hashids = new Hashids(process.env.HASHID_SEED, 0, chars)

export function generateHashid ({ year, counter }) {
  return hashids.encode([year, counter])
}
