const router = require('express').Router()
const {User, Challenge} = require('../db/models')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
    // console.log("PUT ROUTER !!!!")
    // console.log("req.params.id", req.params.id)
    // console.log("this.score", this.score)
    // console.log("req.body.points", req.body.points)
    let user = await User.findOne({
      where: {id: req.user.id}
    })

    // console.log("user.score", user.score)

    user.score += +req.body.points
    if (req.body.won) {
      user.won = true
    }
    user = await user.save()
    const challenge = await Challenge.findOne({
      where: {id: user.challengeId + 1}
    })
    await user.setChallenge(challenge)
    const result = {}
    result.id = user.id
    result.username = user.username
    result.score = user.score
    result.won = user.won
    result.challengeId = user.challengeId
    res.json(result)
  } catch (err) {
    next(err)
  }
})
