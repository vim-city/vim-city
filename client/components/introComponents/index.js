import React from 'react'
import NavBar from '../navbar'
import ProgressBar from '../progressBar'
import About from './about'
import GameIntro from './gameIntro'

export default class IntroPage extends React.Component {
  constructor() {
    super()
    this.state = {
      currentStep: 0
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.setState({
          currentStep: this.state.currentStep + 1
        })
      }
    })
  }
  componentDidUnmount() {
    document.removeEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.setState({
          currentStep: this.state.currentStep + 1
        })
      }
    })
  }

  render() {
    return (
      <div>
        <div className="vim-navbar">
          <NavBar />
        </div>
        <ProgressBar currentStep={this.currentStep} />
        {this.state.currentStep === 0 && <About />}
        {this.state.currentStep === 1 && <GameIntro />}
        {/* {this.state.currentStep === 2 && <X/>} */}

        <div className="aboutProgress">
          <h2>HIT THE "ESC" KEY</h2>
          <h2>to move forward and go into</h2>
          <h2>COMMAND MODE</h2>
        </div>
      </div>
    )
  }
}
