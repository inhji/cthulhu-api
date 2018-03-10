import { generateHashid } from './hashids'
import md from './markdown'

export function hashidHook () {
  const dateObj = new Date(this.createdAt)
  const hashid = generateHashid({
    year: dateObj.getFullYear(),
    counter: this.counter
  })

  this.hashid = hashid
}

export function markdownHook () {
  this.contentHtml = md.render(this.content)
}
