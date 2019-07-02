'use strict'

const db = require('../server/db')
const {User, Challenge} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const user1 = await User.create({email: 'cody@email.com', password: '123'})
  const user2 = await User.create({email: 'murphy@email.com', password: '123'})

  console.log(`seeded users`)

  const challenge1 = await Challenge.create({
    vimCommand: 'l',
    instructions:
      '//Welcome to Vim City! Vin is visiting for vacation and is having a very hard time getting around. Help Vin out by following these Vim commands. \n //Vin is a little parched and would like a nice cocktail and some good music before he continues his adventures in Vim City. Lex’s Lounge serves up the city’s best cocktails and music. Navigate Vin to Lex’s lounge by using the ‘l’ (lower case L) key which will move Vin to the right!',
    points: 500,
    code:
      '//YAY! Vin made it to Lex’s Lounge and is ready to order a drink. Vin is not the best at ordering drinks and has seemed to make an error in his order. Can you help Vin fix his bad code? This function should add ice and an umbrella to Vin’s drink order \n function drinksOrder(drink) {return `${drink} with ice and an umbrella`  \n\n\n\n',
    level: 0
  })
  const challenge2 = await Challenge.create({
    vimCommand: 'j',
    instructions: 'Use the "j" key to move up',
    points: 500,
    code: '() => return true} \n\n\n\n',
    level: 0,
    startingCoordinates: [375, 525]
  })

  console.log(`seeded challenges`)

  await user1.setChallenge(challenge1)
  console.log(`associated some data`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
