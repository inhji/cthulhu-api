import cachedResolver from '../cached_resolver'

const id = process.env.GHOST_CLIENT_ID
const secret = process.env.GHOST_CLIENT_SECRET
const url = `https://blog.inhji.de/ghost/api/v0.1/posts?client_id=${id}&client_secret=${secret}`

export const blogPosts = cachedResolver(url, ({posts}) => {
  return posts.map(p => {
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      createdAt: p.created_at,
      content: p.plaintext,
      contentHtml: p.html,
      image: p.feature_image,
      excerpt: p.custom_excerpt,
      featured: p.featured
    }
  })
})
