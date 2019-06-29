const Sequelize = require('sequelize')
const db = require('../db')

const Challenge = db.define('challenge', {
  vimCommand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  instructions: {
    type: Sequelize.TEXT
  },
  code: {
    type: Sequelize.TEXT
  },
  level: {
    type: Sequelize.INTEGER,
    default: 0
  }
})

module.exports = Challenge