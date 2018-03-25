export const publicHandler = (req, res) => {
  return res.send(
    `<div>
      <p>
        <span>This is Cthulhu API. Feel free to explore the </span>
        <a href="/graphiql">GraphQL Endpoint</a>
      </p>
    </div>`
  )
}
