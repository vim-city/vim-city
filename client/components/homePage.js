import React from 'react'
import GameWindow from './game-window'
import VimShell from './vim-shell'
import Footer from './footer'
import Modal from './modal'

export default class HomePage extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="vimWindow">
            <VimShell />
          </div>
          <div className="gameWindow">
            <GameWindow />
          </div>
        </div>
        <div>
          <Modal />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}
