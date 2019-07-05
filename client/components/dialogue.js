import React from 'react'
import {connect} from 'react-redux'
import {getResult, clearResult} from '../store/result'
import {getChallenge} from '../store/challenge'

class Dialogue extends React.Component {
  render() {
    return (
      <div className="dialogue-parent">
        <div className="dialogue-box">
          <div className="dialogue-box-text">
            {this.props.instructions && this.props.displayInstructions
              ? this.props.instructions
              : null}
          </div>
          <div className="triangle-dialogue" />
        </div>
        <div className="vim-brandon">
          <img src="assets/sprites/brandon.png" />
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  instructions: state.challenge.instructions,
  result: state.result,
  displayInstructions: state.challenge.displayInstructions
})

const mapDispatch = dispatch => ({
  getResult: (codeStr, challengeId) =>
    dispatch(getResult(codeStr, challengeId)),
  getChallenge: challengeId => dispatch(getChallenge(challengeId)),
  clearResult: () => dispatch(clearResult())
})

export default connect(mapState, mapDispatch)(Dialogue)
