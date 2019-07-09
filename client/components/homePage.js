import React from 'react'
import GameWindow from './game-window'
import VimShell from './vim-shell'
import Footer from './footer'
import NavBar from './navbar'

class HomePage extends React.Component {
  render() {
    return (
      <div className="home-page">
        <div className="vim-navbar">
          <NavBar />
        </div>
        <div className="container">
          <div className="gameWindow">
            <GameWindow />
          </div>

          <div className="vimWindow">
            <VimShell />
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default HomePage
