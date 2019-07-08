import React from 'react'
import {logout} from '../store/user'
import {connect} from 'react-redux'

const NavBar = props => {
  if (!props.isLoggedIn) {
    return (
      <div className="vim-header">
        <img src="logo.png" />
        <div className="vim-header-right">
          <div className="vim-header-child">
            <a href="/login">Login</a>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="vim-header">
        <img src="logo.png" />
        <div className="vim-header-right">
          <div className="vim-header-child">
            <p>Welcome, {props.username}</p>
          </div>
          <div className="vim-header-child">
            <p>Score: {props.score}</p>
          </div>
          <div className="vim-header-child">
            <a href="/intro">How to Play</a>
          </div>
          <div className="vim-header-child">
            <a
              onClick={() => {
                props.handleClick()
              }}
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    score: state.user.score,
    isLoggedIn: !!state.user.id,
    username: state.user.username
  }
}

const mapDispatch = dispatch => ({
  handleClick: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(NavBar)
