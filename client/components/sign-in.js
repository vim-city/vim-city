import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import amber from '@material-ui/core/colors/amber'
import Typography from '@material-ui/core/Typography'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

const amberTheme = createMuiTheme({
  palette: {
    primary: amber,
    contrastText: 'white',
    secondary: {
      main: '#ffa000',
      contrastText: 'white'
    }
  }
})

class SignIn extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const username = evt.target.username.value
    const password = evt.target.password.value
    this.props.auth(username, password, formName)
  }
  render() {
    return (
      <MuiThemeProvider theme={amberTheme}>
        <div className="login-container">
          <div className="login-content">
            <div className="vimcity-title">
              <img src="logo-login.png" />
            </div>
            <div className="vim-form">
              <form onSubmit={this.handleSubmit} name="login">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {this.props.error &&
                  this.props.error.response && (
                    <div> {this.props.error.response.data} </div>
                  )}
                <Button
                  type="submit"
                  fullWidth={false}
                  variant="contained"
                  color="secondary"
                  style={{marginLeft: 10, width: '300px', height: '36px'}}
                >
                  Sign Up / Login
                </Button>
                <Button
                  type="submit"
                  fullWidth={false}
                  variant="contained"
                  color="secondary"
                  href="auth/github"
                  style={{margin: 10}}
                >
                  Sign In with GitHub
                </Button>
              </form>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapDispatch = dispatch => ({
  auth: (username, password, formName) =>
    dispatch(auth(username, password, formName))
})

export default connect(mapLogin, mapDispatch)(SignIn)

SignIn.propTypes = {
  error: PropTypes.object
}
