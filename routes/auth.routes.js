const {Router} = require ('express')
const bcryptjs =  require ('bcryptjs')
const {check , validationResult} = require ('express-validator')
const jwt = require('jsonwebtoken')
const User = require ('../Model/User')
const config = require('config')
const router = Router()

router.post(
  '/register',
  [
    check('email', 'Wrong email').isEmail(),
    check('password', 'Wrong passwoed')
      .isLength({ min: 6 }),
    check('username','Wrong username').isLength({min:3})
  ],
  async (req, res) => {
  try {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({
        errors: error.array(),
        message: 'Wrong data during registration'
      })
    }
    const {username,email, password} = req.body
    const emailCandidate = await User.findOne({ email })
    if (emailCandidate) {
      return res.status(400).json({ message: 'User with this email already exists' })
    }
    const usernameCandidate = await User.findOne({ username })
    if (usernameCandidate) {
      return res.status(400).json({ message: 'User with this username already exists' })
    }
    const hashedPassword = await bcryptjs.hash(password, 12)
    const user = new User({username, email, password: hashedPassword })
    await user.save()
    res.status(201).json({ message: 'User created' })
  } catch (e) {
    res.status(500).json({ message: 'Something go wrong, try again' })
  }
})

router.post(
  '/login',
  [
    check('email', 'Wrong email').normalizeEmail().isEmail(),
    check('password', 'Wrong passwoed').exists()
  ],
  async (req,res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Wrong data during registration'
      })
    }
    const {email, password} = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Such user did not exist ' })
    }
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password or email, try again' })
    }
    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtKey'),
      { expiresIn: '1h' }
    )
    res.json({ token, userId: user.id })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Something go wrong, try again' })
    console.log(e)
  }
})

module.exports = router