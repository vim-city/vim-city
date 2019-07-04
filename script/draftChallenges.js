import {string} from '../../../../Library/Caches/typescript/3.5/node_modules/@types/prop-types'

instructions2 =
  'Now that Vin has had a few drinks he’s ready to do some sightseeing. The Kaleidoscope Observatory offers panoramic views of Vim City.  Help Vin walk to the Kaleidoscope by using the “k” key, which will move Vin up.'

code2 = `//Vin is overwhelmed by Vim City’s beauty, and has written a poem to express his feelings.  Vin swaps "i" with "y" so often that he carries around a spellchecker function that takes a string, replaces all "y"s with "i"s and vice versa, and returns the string in lowercase.\n//But Vin's spellchecker is broken. If you can help Vin fix his spellchecker function, he will let you read his poem. \n function spellChecker(poem) {\n   poem.toLowerCase() \n  let fixedPoem = ''\n  for (let i = 0; i < poem.length; i++) {    \nlet letter = poem[i] \n    if (letter === 'i') { \n      fixedPoem += 'y'\n    } else if (letter = 'y') {      \nfixedPoem = 'i' \n    } else {\n      fixedPoem = letter\n    }\n  }\n  return fixedPoem\n}`

instructions3 =
  "Oh no! It's getting late, and Vin has tickets to see his favorite band, Hannah and the Hacks.  Help rush Vin to Harmonixx Music Hall so he can catch the show.  The h key will move Vin left."

code3 = `//What a great performance! Vin was lucky enough to get Hannah's handwritten setlist just before the band left.  Vin wants to tweet about the third song, but he forgot the name of it.  Can you help Vin finish his tweet?  The function below takes a setlist as an array and returns a tweet. \nfunction greatestHit(setlist) {\n  let favoriteSong = setList[0]\n  let blogPost = 'siiiicckk performance by @HannahAndTheHacks in #vimcity. ${favoriteSong} = my anthem'\n}`

instructions4 =
  "Wow, what a day! Vin hasn't eaten yet and he's starting to get lonely, too. Thankfully, Jess's Bunny Cafe has an all-you-can-eat jello bar and affable jackrabbits to keep guests company.  Help Vin navigate to Jess's Bunny Cafe by using the j key to move down."

code4 = `Mmmm! Vin filled his stomach with jello and his heart with jackrabbits.  He loved Jess's carrot-flavored jello so much he wants to bring some home as a souvenir.  The jello costs 89 cents an ounce.  Can you fix the function below, so that it tells Vin how much his take-out box will cost in dollars, rounded to up to the nearest integer?\n'function jelloCalculator(ouncesOfJello) {\n  let dollars = ath.ceil(ouncesOfJello * 89 / 100)\n return doll}'`
