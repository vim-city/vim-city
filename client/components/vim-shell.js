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
import Popup from 'reactjs-popup'
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
    this.onClickHint = this.onClickHint.bind(this)
  }

  // eslint-disable-next-line complexity
  async componentDidMount() {
    let lastChallengeCompleted = this.props.lastChallengeCompleted || 0
    await this.props.getChallenge(lastChallengeCompleted + 1)
    let editor = this.refs.aceEditor.editor

    //move to mouse click helper

    editor.addEventListener('mousedown', e => {
      e.stop()
    })
    editor.addEventListener('click', e => {
      e.stop()
    })
    editor.addEventListener('mouseup', e => {
      e.stop()
    })
    editor.addEventListener('dblclick', e => {
      e.stop()
    })
    editor.addEventListener('tripleclick', e => {
      e.stop()
    })
    editor.addEventListener('quadclick', e => {
      e.stop()
    })

    editor.commands.addCommand({
      name: 'remove right',
      bindKey: {win: 'Right', mac: 'Right'},
      exec: editor => 1
    })
    editor.commands.addCommand({
      name: 'remove left',
      bindKey: {win: 'Left', mac: 'Left'},
      exec: editor => 1
    })
    editor.commands.addCommand({
      name: 'remove up',
      bindKey: {win: 'Up', mac: 'Up'},
      exec: editor => 1
    })
    editor.commands.addCommand({
      name: 'remove down',
      bindKey: {win: 'Down', mac: 'Down'},
      exec: editor => 1,
      readOnly: true
    })

    if (this.props.code && !this.props.displayInstructions) {
      switch (this.props.challengeId) {
        case 1:
          console.log('Case 1 switch')
          editor.setValue(this.props.code, -1)
          editor.navigateTo(1, 0)
          break
        case 2:
          console.log('Case 2 switch')
          editor.setValue(this.props.code, -1)
          editor.navigateTo(16, 0)
          break
        case 3:
          editor.setValue(this.props.code, -1)
          editor.navigateTo(3, 100)
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

  componentDidUpdate(prevProps) {
    let editor = this.refs.aceEditor.editor
    if (!this.props.displayInstructions) {
      switch (this.props.challengeId) {
        case 1:
          console.log('Case 1 switch')
          editor.setValue(this.props.code, -1)
          editor.navigateTo(1, 0)
          break
        case 2:
          console.log('Case 2 switch')
          editor.setValue(this.props.code, -1)
          editor.navigateTo(16, 0)
          break
        case 3:
          editor.setValue(this.props.code, -1)
          editor.navigateTo(3, 100)
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

  onSubmit() {
    console.log(
      'ON SUBMIT IS CALLED, value:',
      this.refs.aceEditor.editor.getValue()
    )
    this.props.getResult(
      this.refs.aceEditor.editor.getValue(),
      this.props.challengeId,
      this.props.maxAnswerLength
    )
  }

  onClickHint() {
    console.log(this.props.hint)
  }

  render() {
    // const classes = useStyles();
    return (
      <div>
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
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="Add"
          onClick={this.onSubmit}
        >
          Run Code
        </Fab>
        <Popup
          trigger={
            <Fab
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
