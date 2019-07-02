const Mocha = require('mocha')
const fs = require('fs')
const util = require('util')
const writeFile = util.promisify(fs.writeFile)
const path = require('path')

const jsonPathToUserInput = path.join(__dirname, '.', 'userInput.js')

//async function, takes a string and returns a string stating test results
let testResult = async str => {
  let testsPassed = 0
  let testsFailed = 0
  let errors = ''
  await writeFile(jsonPathToUserInput, str)
  const mocha = new Mocha({})
  mocha.addFile('./server/tests/challenge_one.spec.js')
  await new Promise(resolve => {
    mocha
      .run()
      .on('pass', function() {
        testsPassed += 1
      })
      .on('fail', function(test) {
        testsFailed += 1
        errors = errors + '\n' + String(test.err)
      })
      .on('end', function() {
        resolve()
      })
  })

  let result = `Tests Passed: ${testsPassed} \n Tests Failed: ${testsFailed} \n Errors: ${errors} `

  return result
}

const logResult = async () => {
  let result = await testResult(
    "const myFunction = '() => false' \n module.exports = myFunction"
  )
  console.log(result)
}

logResult()
