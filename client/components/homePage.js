import React from 'react'
import GameWindow from './game-window'
import VimShell from './vim-shell'

export default class HomePage extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="container">
        <div className="vimWindow">
          <VimShell />
        </div>
        <div className="gameWindow">
          <GameWindow />
        </div>
      </div>
    )
  }
}
