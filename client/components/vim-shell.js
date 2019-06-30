import React, {Component} from 'react'
import AceEditor from 'react-ace'
import {connect} from 'react-redux'
import {getResult} from '../store/result'
// import {VimConsole} from './vim-console'
// import axios from 'axios'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import 'brace/keybinding/vim'

class VimShell extends Component {
  constructor() {
    super()
    // this.state = {code: ''}
    // this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  // onChange(newValue, event) {

  //   this.setState({code: newValue})
  //   console.log('STATE:', this.state)
  // }

  onSubmit() {
    console.log('ON SUBMIT IS CALLED')
    // this.setState({code: this.refs.aceEditor.editor.getValue()})
    this.props.getResult(this.refs.aceEditor.editor.getValue())
    // try {
    //   console.log('INSIDE THE TRY CATCH')
    //   const {data} = await axios.put('http://localhost:49160/eval', {
    //     func: this.state.code
    //   })
    //   console.log('this is data:', data)
    //   await this.setState({result: data})
    //   console.log('this is the state:', this.state)
    // } catch (error) {
    //   console.log('error in vim-shell', error)
    // }

    // console.log(this.state)
  }
  render() {
    console.log(
      're-rendering',
      'results',
      this.props.result,
      'props',
      this.props
    )
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme="monokai"
          keyboardHandler="vim"
          ref="aceEditor"
          defaultValue={this.props.text}
          // commands={[
          //   {
          //     name: 'disableUp',
          //     bindKey: {win: 'Up', mac: 'Up'}, //key combination used for the command.
          //     exec: () => {
          //       console.log('This key is disabled.')
          //     }
          //   }
          // ]}
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
    text: state.text
  }
}

const mapDispatch = dispatch => ({
  getResult: codeStr => dispatch(getResult(codeStr))
})

export default connect(mapState, mapDispatch)(VimShell)
