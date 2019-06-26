import React, {Component} from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import 'brace/keybinding/vim'

export default class VimShell extends Component {
  constructor() {
    super()
    this.state = {code: ''}
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
    console.log(this.state)
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
      </div>
    )
  }
}
