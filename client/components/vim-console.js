import React from 'react'

export class VimConsole extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: props.result || ' '
    }
  }

  render() {
    return (
      <div>
        <h1>This is result:{this.state.result}</h1>
      </div>
    )
  }
}
