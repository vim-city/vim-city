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

  async componentDidMount() {
    let lastChallengeCompleted = this.props.lastChallengeCompleted || 0
    await this.props.getChallenge(lastChallengeCompleted + 1)
    let editor = this.refs.aceEditor.editor
    editor.addEventListener('click', () => {
      editor.navigateTo(1, 0)
    })

    editor.commands.addCommand({
      name: 'remove right',
      bindKey: {win: 'Right', mac: 'Right'},
      exec: function(editor) {
        console.log('Right')
      },
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
      // if (prevProps.instructions !== this.props.instructions) {
      //   // editor.addEventListener('click', () => {
      //   //   editor.navigateTo(2,0)
      //   // })
      //   console.log('this.props.instructions', this.props.instructions)
      //   editor.setValue(this.props.instructions, -1)
      //   editor.navigateTo(1, 0)
      // }
      console.log('this.props.instructions', this.props.instructions)
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
