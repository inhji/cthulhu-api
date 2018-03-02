import { generateHashid } from './hashids'
import md from './markdown'

export function postHook () {
  const dateObj = new Date(this.createdAt)
  const hashid = generateHashid({
    year: dateObj.getFullYear(),
    counter: this.counter
  })

  this.hashid = hashid
}

export function noteHook () {
  this.content = md.render(this.content)
}
