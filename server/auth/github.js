const passport = require('passport')
const router = require('express').Router()
const GitHubStrategy = require('passport-github').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  console.log('Github client ID / secret not found. Skipping Github OAuth.')
} else {
  const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
  }

  const strategy = new GitHubStrategy(
    githubConfig,
    (token, refreshToken, profile, done) => {
      const gitHubId = profile.id
      const username = profile.username
      User.findOrCreate({
        where: {gitHubId},
        defaults: {username: username}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get('/', passport.authenticate('github', {scope: 'email'}))

  router.get(
    '/callback',
    passport.authenticate('github', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
