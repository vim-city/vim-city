import React, {Component} from 'react'
import AceEditor from 'react-ace'
import {connect} from 'react-redux'
import {getResult} from '../store/result'
import {getChallenge} from '../store/challenge'
// import {VimConsole} from './vim-console'
// import axios from 'axios'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import 'brace/keybinding/vim'

class VimShell extends Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.getChallenge('l')
  }
  onSubmit() {
    console.log(
      'ON SUBMIT IS CALLED, value:',
      this.refs.aceEditor.editor.getValue()
    )

    this.props.getResult(this.refs.aceEditor.editor.getValue())
  }
  render() {
    console.log(
      're-rendering',
      'results',
      this.props.result,
      'props',
      this.props
    )
    return !this.props.instructions ? (
      <div>LOADING</div>
    ) : (
      <div>
        <AceEditor
          mode="javascript"
          theme="monokai"
          keyboardHandler="vim"
          ref="aceEditor"
          value={this.props.instructions}
        />
        <button type="submit" onClick={this.onSubmit}>
          Run Code
        </button>

        {/* {this.state.result.length ? <VimConsole result={this.state.result}/> : null} */}
        <div className="console">
          <h1>This is result:</h1>
          <p>{this.props.result}</p>
        </div>
      </div>
    )
  }
}

//integrate Vim Console with thunk

const mapState = state => {
  return {
    result: state.result,
    instructions: state.challenge.instructions,
    code: state.challenge.code
  }
}

const mapDispatch = dispatch => ({
  getResult: codeStr => dispatch(getResult(codeStr)),
  getChallenge: commandKey => dispatch(getChallenge(commandKey))
})

export default connect(mapState, mapDispatch)(VimShell)
