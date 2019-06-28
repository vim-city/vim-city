const User = require('./user')
const Challenge = require('./challenge')

User.belongsTo(Challenge)

module.exports = {
  User,
  Challenge
}
