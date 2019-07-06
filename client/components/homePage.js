import React from 'react'
import GameWindow from './game-window'
import VimShell from './vim-shell'
import Footer from './footer'

import NavBar from './navbar'
import Dialogue from './dialogue'

// import Modal from './modal'

export default class HomePage extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="home-page">
        <div className="vim-navbar">
          <NavBar />
        </div>
        <div className="vim-bubble-text">
          <Dialogue />
        </div>
        <div className="container">
          <div className="vimWindow">
            <VimShell />
          </div>
          <div className="gameWindow">
            <GameWindow />
          </div>
        </div>
        {/* <div>
          <Modal />
        </div> */}
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}
