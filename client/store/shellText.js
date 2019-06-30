import axios from 'axios'

//Action types
const SET_TEXT = 'GET_TEXT'
const CLEAR_TEXT = 'CLEAR_TEXT'

//Action creators

const gotText = text => ({type: SET_TEXT, text})
const clearText = () => ({
  type: CLEAR_TEXT
})

//Thunks

//getInstruction thunk takes command and returns instruction text
export const getInstruction = commandKey => async dispatch => {
  try {
    const {data} = await axios.get(`/api/challenges/instructions/${commandKey}`)
    dispatch(gotText(data))
  } catch (error) {
    console.log('error in getInstruction thunk', error)
  }
}

//getChallenge thunk takes challengeId and returns instruction text
export const getChallenge = commandKey => async dispatch => {
  try {
    const {data} = await axios.get(`/api/challenges/challenge/${commandKey}`)
    dispatch(gotText(data))
  } catch (error) {
    console.log('error in getInstruction thunk', error)
  }
}

//initial state
const defaultResult = 'This is default text'

export default function(state = defaultResult, action) {
  switch (action.type) {
    case SET_TEXT:
      return action.text
    case CLEAR_TEXT:
      return defaultResult
    default:
      return state
  }
}
