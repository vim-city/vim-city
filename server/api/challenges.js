const router = require('express').Router()
const {Challenge} = require('../db/models')
module.exports = router

router.get('/:challengeId', async (req, res, next) => {
  try {
    const challenge = await Challenge.findOne({
      where: {id: req.params.challengeId},
      attributes: [
        'id',
        'vimCommand',
        'instructions',
        'code',
        'points',
        'level',
        'startingCoordinates'
      ]
    })
    res.json(challenge)
  } catch (err) {
    next(err)
  }
})
