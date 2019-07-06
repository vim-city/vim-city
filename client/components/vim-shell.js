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
// import { makeStyles } from '@material-ui/core';

// const useStyles = makeStyles(theme => ({
//  Fab: {
//    margin: theme.spacing(1),
//  },
//  input: {
//    display: 'none',
//  },
// }));

class VimShell extends Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
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

  render() {
    // const classes = useStyles();
    return (
      <div>
        {!this.props.displayInstructions && !this.props.result.passed ? (
          <AceEditor
            mode="javascript"
            theme="kuroir"
            keyboardHandler="vim"
            ref="aceEditor"
            wrapEnabled={true}
            height="544px"
            width="500px"
            fontSize={15}
          />
        ) : (
          <AceEditor
            mode="javascript"
            theme="kuroir"
            ref="aceEditor"
            wrapEnabled={true}
            height="544px"
            width="500px"
            readOnly={true}
            fontSize={15}
          />
        )}
        <Fab
          // className={classes.Fab}
          variant="extended"
          size="medium"
          color="primary"
          //"#00ffff"
          aria-label="Add"
          onClick={this.onSubmit}
        >
          Run Code
        </Fab>
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
