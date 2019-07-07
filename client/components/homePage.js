import React from 'react'
import GameWindow from './game-window'
import VimShell from './vim-shell'
import Footer from './footer'
import {connect} from 'react-redux'
import NavBar from './navbar'
import Dialogue from './dialogue'

// import Modal from './modal'

class HomePage extends React.Component {
  constructor() {
    super()
  }
  render() {
    if (this.props.loading)
      return (
        <div id="clouds">
          <div className="cloud x1" />
          <div className="cloud x2" />
          <div className="cloud x3" />
          <div className="cloud x4" />
          <div className="cloud x5" />
          <div className="cloud x6" />
          <div className="cloud x7" />
        </div>
      )
    return (
      <div className="home-page">
        <div className="vim-navbar">
          <NavBar />
        </div>
        {/* <div className="vim-bubble-text">
          <Dialogue />
        </div> */}
        <div className="container">
          <div className="gameWindow">
            <GameWindow />
          </div>

          <div className="vimWindow">
            <VimShell />
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

const mapState = state => {
  return {
    loading: state.loading
  }
}

export default connect(mapState)(HomePage)
