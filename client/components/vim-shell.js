import React, {Component} from 'react'
import AceEditor from 'react-ace'
import {connect} from 'react-redux'
import {getResult, clearResult} from '../store/result'
import {getChallenge} from '../store/challenge'
import {updateUserThunk} from '../store/user'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import 'brace/keybinding/vim'
import Fab from '@material-ui/core/Fab'
import inputHelper from './vim-shell-input-helper'
import red from '@material-ui/core/colors/red'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import Popup from 'reactjs-popup'

const redTheme = createMuiTheme({
  palette: {
    primary: red,
    secondary: {
      main: '#ef5350'
    }
  }
})

class VimShell extends Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)

    this.onReset = this.onReset.bind(this)
  }

  // eslint-disable-next-line complexity
  async componentDidMount() {
    let lastChallengeCompleted = this.props.lastChallengeCompleted || 0
    if (lastChallengeCompleted <= 3) {
      await this.props.getChallenge(lastChallengeCompleted + 1)
    }
    if (this.refs.aceEditor) {
      let editor = this.refs.aceEditor.editor
      inputHelper(editor)
      if (this.props.code && !this.props.displayInstructions) {
        switch (this.props.challengeId) {
          case 1:
            editor.setValue(this.props.code, -1)
            editor.navigateTo(2, 0)
            break
          case 2:
            editor.setValue(this.props.code, -1)
            editor.navigateTo(16, 0)
            break
          case 3:
            editor.setValue(this.props.code, -1)
            editor.navigateTo(4, 100)
            break
          case 4:
            editor.setValue(this.props.code, -1)
            editor.navigateTo(1, 0)
            break
          default:
            editor.setValue(this.props.code, -1)
            editor.navigateTo(1, 0)
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.refs.aceEditor) {
      let editor = this.refs.aceEditor.editor
      if (!this.props.displayInstructions) {
        switch (this.props.challengeId) {
          case 1:
            editor.setValue(this.props.code, -1)
            editor.navigateTo(2, 0)
            break
          case 2:
            editor.setValue(this.props.code, -1)
            editor.navigateTo(16, 0)
            break
          case 3:
            editor.setValue(this.props.code, -1)
            editor.navigateTo(4, 100)
            break
          case 4:
            editor.setValue(this.props.code, -1)
            editor.navigateTo(1, 0)
            break
          default:
            editor.setValue(this.props.code, -1)
            editor.navigateTo(1, 0)
        }
      }
    }
  }

  onSubmit() {
    this.props.getResult(
      this.refs.aceEditor.editor.getValue(),
      this.props.challengeId,
      this.props.maxAnswerLength
    )
  }

  onReset() {
    let editor = this.refs.aceEditor.editor
    editor.setValue(this.props.code, -1)
    editor.navigateTo(1, 0)
  }

  render() {
    return (
      <div>
        <Fab
          style={{margin: 10}}
          variant="extended"
          size="medium"
          color="secondary"
          aria-label="Add"
          onClick={this.onSubmit}
        >
          Run Code
        </Fab>
        <Popup
          className="popup-content"
          trigger={
            <Fab
              style={{margin: 10}}
              variant="extended"
              size="medium"
              color="primary"
              aria-label="Add"
            >
              Hint
            </Fab>
          }
        >
          {close => (
            <div>
              <div className="hint-text">{this.props.hint}</div>
              <div className="close">
                <a onClick={close}>X</a>
              </div>
            </div>
          )}
        </Popup>

        <MuiThemeProvider theme={redTheme}>
          <Fab
            style={{margin: 10}}
            variant="extended"
            size="medium"
            color="secondary"
            aria-label="Add"
            onClick={this.onReset}
          >
            Reset
          </Fab>
        </MuiThemeProvider>
        {!this.props.displayInstructions && !this.props.result.passed ? (
          <AceEditor
            mode="javascript"
            theme="kuroir"
            keyboardHandler="vim"
            ref="aceEditor"
            wrapEnabled={true}
            height="520px"
            width="500px"
            fontSize={15}
          />
        ) : (
          <AceEditor
            mode="javascript"
            theme="kuroir"
            ref="aceEditor"
            wrapEnabled={true}
            height="520px"
            width="500px"
            readOnly={true}
            fontSize={15}
          />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    result: state.result,
    challengeId: state.challenge.id,
    challengePoints: state.challenge.points,
    instructions: state.challenge.instructions,
    code: state.challenge.code,
    hint: state.challenge.hint,
    maxAnswerLength: state.challenge.maxAnswerLength,
    displayInstructions: state.challenge.displayInstructions,
    score: state.user.score,
    lastChallengeCompleted: state.user.challengeId,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => ({
  getResult: (codeStr, challengeId, maxAnswerLength) =>
    dispatch(getResult(codeStr, challengeId, maxAnswerLength)),
  getChallenge: challengeId => dispatch(getChallenge(challengeId)),
  clearResult: () => dispatch(clearResult()),
  updateUser: points => dispatch(updateUserThunk(points))
})

export default connect(mapState, mapDispatch)(VimShell)
