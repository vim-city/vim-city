import axios from 'axios'

//Action types
const SET_CHALLENGE = 'SET_CHALLENGE'
const TOGGLE_DISPLAY = 'TOGGLE_DISPLAY'

//Action creators

const gotChallenge = challenge => ({type: SET_CHALLENGE, challenge})
export const toggleDisplay = () => ({type: TOGGLE_DISPLAY})

//Thunks

//getInstruction thunk takes command and returns object with instructions and code for given challenge
export const getChallenge = challengeId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/challenges/${challengeId}`)
    data.displayInstructions = true
    dispatch(gotChallenge(data))
  } catch (error) {
    console.log('error in getChallenge thunk', error)
  }
}

//initial state (has vimCommand, instructions, code, points, level properties)
const defaultChallenge = {}

export default function(state = defaultChallenge, action) {
  switch (action.type) {
    case SET_CHALLENGE:
      return action.challenge
    case TOGGLE_DISPLAY:
      return {
        ...state,
        displayInstructions: false
      }
    default:
      return state
  }
}
