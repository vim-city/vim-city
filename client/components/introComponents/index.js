import React from 'react'
import NavBar from '../navbar'
import ProgressBar from './progressBar'
import About from './about'
import GameIntro from './gameIntro'
import ConsoleIntro from './editorIntro'
import {Redirect} from 'react-router-dom'

export default class IntroPage extends React.Component {
  constructor() {
    super()
    this.state = {
      currentStep: 0
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' || e.key === 'i') {
        this.setState({
          currentStep: this.state.currentStep + 1
        })
        window.scrollTo(0, 0)
      }
    })
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', e => {
      if (e.key === 'Escape' || e.key === 'i') {
        this.setState({
          currentStep: this.state.currentStep + 1
        })
      }
    })
  }

  render() {
    return (
      <div className="intro">
        <div className="vim-navbar">
          <NavBar />
        </div>

        <ProgressBar currentStep={this.state.currentStep} />
        {this.state.currentStep === 0 && <About />}
        {this.state.currentStep === 1 && <GameIntro />}
        {this.state.currentStep === 2 && <ConsoleIntro />}
        {this.state.currentStep === 3 && <Redirect to="/" />}

        {this.state.currentStep !== 0 && (
          <button
            type="button"
            onClick={() => {
              this.setState({
                currentStep: this.state.currentStep - 1
              })
              window.scrollTo(0, 0)
            }}
          >
            Wait! Take me a step back.
          </button>
        )}
      </div>
    )
  }
}
