const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const [user, status] = await User.findOrCreate({
      where: {
        email: req.body.email
      },
      defaults: {password: req.body.password}
    })
    if (!status && !user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      let result = {}
      result.id = user.id
      result.email = user.email
      result.score = user.score
      result.challengeId = user.challengeId
      result.won = user.won
      result.status = status
      req.login(user, err => (err ? next(err) : res.json(result)))
    }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(error)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  let result = {}
  result.id = req.user.id
  result.email = req.user.email
  result.score = req.user.score
  result.challengeId = req.user.challengeId
  result.won = req.user.won
  res.json(result)
})

router.use('/github', require('./github'))
