import React from 'react'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'
import {connect} from 'react-redux'

const NavBar = props => {
  return (
    <div>
      <p>Money on your Metrocard: ${props.score}</p>
      <button
        type="button"
        onClick={() => {
          props.handleClick()
        }}
      >
        Logout
      </button>
    </div>
  )
}

const mapDispatch = dispatch => ({
  handleClick: () => dispatch(logout())
})

export default connect(null, mapDispatch)(NavBar)
