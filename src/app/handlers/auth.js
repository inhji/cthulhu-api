import User from '../../api/user/model'
const dev = process.env.NODE_ENV !== 'production'

export const loggedinHandler = async (req, res) => {
  if (req.user && req.user._id) {
    return res.sendStatus(200)
  } else {
    return res.sendStatus(401)
  }
}

export const loginHandler = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.sendStatus(400).json({
      error: 'Missing Credentials'
    })
  }

  const user = await User.findOne({ email })

  if (!user) {
    return res.sendStatus(403).json({
      error: 'Invalid Credentials'
    })
  }

  const validPassword = await user.validPassword(password)

  if (!validPassword) {
    return res.sendStatus(403).json({
      error: 'Invalid Credentials'
    })
  }

  const token = user.createToken()

  res.cookie(process.env.COOKIE_NAME, token, {
    httpOnly: true,
    secure: !dev,
    maxAge: 604800000 // 7 days
  })

  res.sendStatus(200)
}
