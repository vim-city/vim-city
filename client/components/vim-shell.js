import React, {Component} from 'react'
import AceEditor from 'react-ace'
import {connect} from 'react-redux'
import {getResult, clearResult} from '../store/result'
import {getChallenge} from '../store/challenge'
import {updateUserThunk} from '../store/user'
import NavBar from './navbar'
// import {VimConsole} from './vim-console'
// import axios from 'axios'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import 'brace/keybinding/vim'
import user from '../store/user'

class VimShell extends Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  async componentDidMount() {
    let lastChallengeCompleted = this.props.lastChallengeCompleted || 0
    await this.props.getChallenge(lastChallengeCompleted + 1)
    let editor = this.refs.aceEditor.editor
    editor.getSession().selection.on('changeSelection', function(e) {
      editor.getSession().selection.clearSelection()
    })

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
    editor.on('guttermousedown', e => {
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

    document.addEventListener('keydown', e => {
      console.log(e.code)
    })

    if (this.props.instructions && this.props.displayInstructions) {
      editor.setValue(this.props.instructions, -1)
      editor.navigateTo(1, 0)
    } else if (this.props.code && !this.props.displayInstructions) {
      editor.setValue(this.props.code, -1)
      editor.navigateTo(1, 0)
    }
  }

  componentDidUpdate(prevProps) {
    let editor = this.refs.aceEditor.editor
    if (this.props.displayInstructions) {
      editor.setValue(this.props.instructions, -1)
      editor.navigateTo(1, 0)
    } else {
      editor.setValue(this.props.code, -1)
      editor.navigateTo(1, 0)
    }
    // if(this.props.result !== prevProps.result){
    //   console.log("result!")
    //   if(this.props.result === "You win!"){
    //     console.log("getting challenge!",this.props.challengeId, typeof this.props.challengeId, Number(this.props.challengeId) + 1 )

    //     this.props.getChallenge(Number(this.props.challengeId) + 1)
    //   }
    // }

    //if (prevProps.displayInstructions !== this.props.displayInstructions)
  }

  onSubmit() {
    console.log(
      'ON SUBMIT IS CALLED, value:',
      this.refs.aceEditor.editor.getValue()
    )
    this.props.getResult(
      this.refs.aceEditor.editor.getValue(),
      this.props.challengeId
    )
  }

  onClick() {
    this.props.updateUser(this.props.challengePoints)
    this.props.getChallenge(Number(this.props.challengeId) + 1)
    this.props.clearResult()
  }

  render() {
    // console.log(
    //   're-rendering',
    //   'results',
    //   this.props.result,
    //   'props',
    //   this.props
    // )
    return (
      <div>
        <NavBar score={this.props.score} />
        <AceEditor
          mode="javascript"
          theme="monokai"
          keyboardHandler="vim"
          ref="aceEditor"
          wrapEnabled={true}
          // value={!this.props.instructions ? 'LOADING' : this.props.instructions}
        />
        <button type="submit" onClick={this.onSubmit}>
          Run Code
        </button>

        {/* {this.state.result.length ? <VimConsole result={this.state.result}/> : null} */}
        <div className="console">
          <h1>This is result:</h1>
          <p>{this.props.result.message}</p>
          {this.props.result.passed ? (
            <button type="button" onClick={this.onClick}>
              {' '}
              Collect your points and move onto the next challenge{' '}
            </button>
          ) : null}
        </div>
      </div>
    )
  }
}

//integrate Vim Console with thunk

const mapState = state => {
  return {
    result: state.result,
    challengeId: state.challenge.id,
    challengePoints: state.challenge.points,
    instructions: state.challenge.instructions,
    code: state.challenge.code,
    displayInstructions: state.challenge.displayInstructions,
    score: state.user.score,
    lastChallengeCompleted: state.user.challengeId,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => ({
  getResult: (codeStr, challengeId) =>
    dispatch(getResult(codeStr, challengeId)),
  getChallenge: challengeId => dispatch(getChallenge(challengeId)),
  clearResult: () => dispatch(clearResult()),
  updateUser: points => dispatch(updateUserThunk(points))
})

export default connect(mapState, mapDispatch)(VimShell)
