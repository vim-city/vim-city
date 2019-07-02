const router = require('express').Router()
const {User, Challenge} = require('../db/models')
module.exports = router

router.put('/:id', async (req, res, next) => {
  try {
    // console.log("PUT ROUTER !!!!")
    // console.log("req.params.id", req.params.id)
    // console.log("this.score", this.score)
    // console.log("req.body.points", req.body.points)
    let user = await User.findOne({
      where: {id: req.params.id}
    })

    // console.log("user.score", user.score)

    user.score += +req.body.points
    user = await user.save()
    const challenge = await Challenge.findOne({
      where: {id: user.challengeId + 1}
    })
    await user.setChallenge(challenge)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      include: {model: Challenge},
      attributes: ['id', 'email', 'score', 'challenge']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
