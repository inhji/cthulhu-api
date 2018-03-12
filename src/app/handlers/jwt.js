export const jwtHandler = req => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  } else if (req.headers && req.cookies[process.env.COOKIE_NAME]) {
    return req.cookies[process.env.COOKIE_NAME]
  }

  return null
}
