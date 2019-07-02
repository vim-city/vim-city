const {expect} = require('chai')
const userInput = require('./userInput')
let indirectEval = eval

describe('Function', () => {
  it('returns true', () => {
    expect(indirectEval(userInput)()).to.equal(true)
  })
  it('returns false', () => {
    expect(indirectEval(userInput)()).to.equal(false)
  })
})
