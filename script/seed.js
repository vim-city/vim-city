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
      'Vin is a little parched and would like a nice cocktail and some good music before Vin continues their adventures in Vim City. Lex’s Lounge serves up the city’s best cocktails and music. Navigate Vin to Lex’s lounge by using the ‘l’ (lower case L) key which will move Vin to the right!',
    points: 500,
    code:
      '//YAY! Vin made it to Lex’s Lounge and is ready to order a drink. Vin is not the best at ordering drinks and has seemed to make an error in their order. Can you help Vin fix their bad code? This function should add ice and an umbrella to Vin’s drink order \n function drinksOrder(drink) {return `${drink} with ice and an umbrella`\n',
    startingCoordinates: [20, 520],
    activeColliders: [true, true, true, true],
    level: 0,
    numEdits: 1
  })

  const challenge2 = await Challenge.create({
    vimCommand: 'j',
    instructions:
      'Now that Vin has had a few drinks their ready to do some sightseeing. The Kaleidoscope Observatory offers panoramic views of Vim City.  Help Vin walk to the Kaleidoscope by using the “k” key, which will move Vin up.',
    points: 500,
    code: `//Vin is overwhelmed by Vim City’s beauty, and wrote a poem to express their feelings.  Vin swaps "i" with "y" so often that Vin carries around a spellchecker function that takes a string, replaces all "y"s with "i"s and vice versa, and returns the string in lowercase.\n//But Vin's spellchecker is broken. Can you help Vin fix it? \n function spellChecker(poem) {\n   poem.toLowerCase() \n  let fixedPoem = ''\n  for (let i = 0; i < poem.length; i++) {    \nlet letter = poem[i] \n    if (letter === 'i') { \n      fixedPoem += 'y'\n    } else if (letter = 'y') {\n      fixedPoem = 'i' \n    } else {\n      fixedPoem = letter\n    }\n  }\n  return fixedPoem\n}\n`,
    level: 0,
    startingCoordinates: [280, 520],
    activeColliders: [false, true, true, true],

    numEdits: 4
  })

  const challenge3 = await Challenge.create({
    vimCommand: 'h',
    instructions:
      "Oh no! It's getting late, and Vin has tickets to see their favorite band, Hannah and the Hacks.  Help rush Vin to Harmonixx Music Hall so they can catch the show.  The h key will move Vin left.",
    points: 500,
    code:
      "//What a terrific performance! Vin was lucky enough to get Hannah's handwritten setlist after the show.  Vin wants to tweet about the third song, but Vin forgot its name.  Can you help Vin finish their tweet?  The function below takes a setlist as an array and returns a tweet. \nfunction greatestHit(setList) {\n  let favoriteSong = setList[0]\n  let tweet = `siiiicckk performance by @HannahAndTheHacks in #vimcity. {favoriteSong} = my anthem`\n  return tweet}\n",
    level: 0,
    startingCoordinates: [460, 380],
    activeColliders: [false, false, true, true],
    numEdits: 1
  })

  const challenge4 = await Challenge.create({
    vimCommand: 'j',
    instructions:
      "Wow, what a day! Vin hasn't eaten yet and their starting to get lonely, too. Thankfully, Jess's Bunny Cafe has an all-you-can-eat jello bar and affable jackrabbits to keep guests company.  Help Vin navigate to Jess's Bunny Cafe by using the j key to move down.",
    points: 500,
    code:
      '//Mmmm! Vin filled their stomach with jello and their heart with jackrabbits. Vin loved the carrot-flavored jello and wants to bring some home as a souvenir.  The jello costs 89 cents an ounce. Can you fix the function below so that it tells Vin how much their take-out box will cost in dollars, rounded to up to the nearest integer? \nfunction jelloCalculator(ouncesOfJello) {\n  let dollars = ath.ceil(ouncesOfJello * 89 / 100)\n return doll}\n',
    level: 0,
    startingCoordinates: [140, 160],
    activeColliders: [false, false, false, true],
    // startingCoordinates: [700, 220],
    // activeColliders: [false, false, false, false],
    numEdits: 4
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
