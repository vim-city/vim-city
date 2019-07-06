import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import amber from '@material-ui/core/colors/amber'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
const redTheme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: {
      main: '#ff6f00'
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
    const email = evt.target.email.value
    const password = evt.target.password.value
    this.props.auth(email, password, formName)
  }
  render() {
    return (
      <MuiThemeProvider theme={redTheme}>
        <div className="login-container">
          <div className="login-content">
            <div className="vimcity-title">
              <img src="logo-login.png" />
            </div>
            <div className="vim-form">
              <form onSubmit={this.handleSubmit} name="login">
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                >
                  Sign In
                </Button>
                <Button
                  type="submit"
                  fullWidth={false}
                  variant="contained"
                  color="secondary"
                  href="auth/github"
                  margin="20%"
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
  auth: (email, password, formName) => dispatch(auth(email, password, formName))
})

export default connect(mapLogin, mapDispatch)(SignIn)

/**
 * PROP TYPES
 */

SignIn.propTypes = {
  error: PropTypes.object
}
