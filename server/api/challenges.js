const router = require('express').Router()
const {Challenge} = require('../db/models')
module.exports = router

router.get('/:commandKey', async (req, res, next) => {
  try {
    const challenge = await Challenge.findOne({
      where: {vimCommand: req.params.commandKey},
      attributes: ['vimCommand', 'instructions', 'code', 'points', 'level']
    })
    res.json({code: challenge.code, instructions: challenge.instructions})
  } catch (err) {
    next(err)
  }
})
