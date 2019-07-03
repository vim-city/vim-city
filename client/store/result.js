import axios from 'axios'

const DISPLAY_RESULT = 'DISPLAY_RESULT'
const CLEAR_RESULT = 'CLEAR_RESULT'

const initialState = {
  passed: false,
  message: ''
}

const displayResult = result => ({type: DISPLAY_RESULT, result})
export const clearResult = () => ({type: CLEAR_RESULT})

export const getResult = (codeStr, challengeId) => async dispatch => {
  try {
    const {data} = await axios.put('http://localhost:49160/eval', {
      userInputStr: codeStr,
      challengeId: challengeId
    })
    // const result = String(data.message)
    // console.log('this is result as string:', result)
    dispatch(displayResult(data))
  } catch (error) {
    console.log('error in vim-shell', error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_RESULT:
      return action.result
    case CLEAR_RESULT:
      return initialState
    default:
      return state
  }
}
