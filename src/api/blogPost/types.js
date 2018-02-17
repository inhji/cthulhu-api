export default /* GraphQL */ `
  type BlogPost {
    id: ID
    title: String
    slug: String
    createdAt: DateTime
    featured: Boolean
    content: String
    contentHtml: String
    image: String
    excerpt: String
  }
`
