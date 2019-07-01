import axios from 'axios'

//Action types
const SET_CHALLENGE = 'GET_TEXT'

//Action creators

const gotChallenge = challenge => ({type: SET_CHALLENGE, challenge})

//Thunks

//getInstruction thunk takes command and returns object with instructions and code for given challenge
export const getChallenge = commandKey => async dispatch => {
  try {
    const {data} = await axios.get(`/api/challenges/${commandKey}`)
    dispatch(gotChallenge(data))
  } catch (error) {
    console.log('error in getChallenge thunk', error)
  }
}

//initial state (will eventually have vimCommand, instructions, code, points, level properties)
const defaultChallenge = {}

export default function(state = defaultChallenge, action) {
  switch (action.type) {
    case SET_CHALLENGE:
      return action.challenge
    default:
      return state
  }
}
