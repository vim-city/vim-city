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

class VimShell extends Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
    this.onClick = this.onClick.bind(this)
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

    if (this.props.instructions && this.props.displayInstructions) {
      editor.setValue(this.props.instructions, -1)
      editor.navigateTo(1, 0)
    } else if (this.props.code && !this.props.displayInstructions) {
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
    if (this.props.displayInstructions) {
      editor.setValue(this.props.instructions, -1)
      editor.navigateTo(1, 0)
    } else {
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

  onClick() {
    this.props.updateUser(this.props.challengePoints)
    this.props.getChallenge(Number(this.props.challengeId) + 1)
    this.props.clearResult()
  }

  render() {
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme="kuroir"
          keyboardHandler="vim"
          ref="aceEditor"
          wrapEnabled={true}
          height="450px"
          width="450px"
          fontSize="20"
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
        {/* <button type="submit" onClick={this.onSubmit}>
          Run Code
        </button> */}

        {/* {this.state.result.length ? <VimConsole result={this.state.result}/> : null} */}
        {/* <div className="console">
          <h1>This is result:</h1>
          <p>{this.props.result.message}</p>
          {this.props.result.passed ? (
            <button type="button" onClick={this.onClick}>
              {' '}
              Collect your points and move onto the next challenge{' '}
            </button>
          ) : null}
        </div> */}
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
