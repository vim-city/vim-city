import axios from 'axios'

const DISPLAY_RESULT = 'DISPLAY_RESULT'
const CLEAR_RESULT = 'CLEAR_RESULT'

const defaultResult = 'answer will appear here'

const displayResult = result => ({type: DISPLAY_RESULT, result})
const clearResult = () => ({type: CLEAR_RESULT})

export const getResult = codeStr => async dispatch => {
  try {
    console.log('THUNK - INSIDE THE TRY CATCH')
    const {data} = await axios.put('http://localhost:49160/eval', {
      func: codeStr
    })
    console.log('this is data:', data)
    const result = String(data)
    console.log('this is result as string:', result)
    dispatch(displayResult(result))
  } catch (error) {
    console.log('error in vim-shell', error)
  }
}

export default function(state = defaultResult, action) {
  switch (action.type) {
    case DISPLAY_RESULT:
      return action.result
    case CLEAR_RESULT:
      return defaultResult
    default:
      return state
  }
}
