// Action Types

const TOGGLE_CLOSE = 'TOGGLE_CLOSE'

// Initial State

const initialState = {}

// Action Creator

export const toggleClose = () => {
  return {
    type: TOGGLE_CLOSE
  }
}

// export const modalToggleThunk = () => async dispatch => {
//   try {
//     const {data} = await axios.put()
//   } catch (error) {
//     console.error(error)
//   }
// }

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CLOSE:
      return {
        ...state,
        modalOpen: false
      }
    default:
      return state
  }
}
