import React, {Component} from 'react'
import AceEditor from 'react-ace'
import {VimConsole} from './vim-console'
import axios from 'axios'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import 'brace/keybinding/vim'

export default class VimShell extends Component {
  constructor() {
    super()
    this.state = {code: '', result: ''}
    // this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  // onChange(newValue, event) {

  //   this.setState({code: newValue})
  //   console.log('STATE:', this.state)
  // }

  async onSubmit(event) {
    console.log('ON SUBMIT IS CALLED')
    await this.setState({code: this.refs.aceEditor.editor.getValue()})
    try {
      console.log('INSIDE THE TRY CATCH')
      const {data} = await axios.put('http://localhost:49160/eval', {
        func: this.state.code
      })
      console.log('this is data:', data)
      await this.setState({result: data})
    } catch (error) {
      console.log('error in vim-shell', error)
    }

    // console.log(this.state)
  }
  render() {
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme="monokai"
          keyboardHandler="vim"
          ref="aceEditor"
          commands={[
            {
              name: 'disableUp',
              bindKey: {win: 'Up', mac: 'Up'}, //key combination used for the command.
              exec: () => {
                console.log('This key is disabled.')
              }
            }
          ]}
        />
        <button type="submit" onClick={this.onSubmit}>
          Run Code
        </button>

        <VimConsole result={this.state.result} />
      </div>
    )
  }
}

//integrate Vim Console with thunk
