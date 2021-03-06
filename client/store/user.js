import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {
  loading: true
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateUser = user => ({type: UPDATE_USER, user})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (username, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {username, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    const status = res.data.status
    dispatch(getUser(res.data))
    if (status) {
      history.push('/intro')
    } else {
      history.push('/')
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const updateUserThunk = (points, won = false) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users`, {points, won})
    dispatch(updateUser(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, ...action.user, loading: false}
    case UPDATE_USER:
      return action.user
    case REMOVE_USER:
      return {...defaultUser, loading: false}
    default:
      return state
  }
}
