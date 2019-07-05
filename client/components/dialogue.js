import React from 'react'
import {connect} from 'react-redux'
import {getResult, clearResult} from '../store/result'
import {getChallenge} from '../store/challenge'
import {updateUserThunk} from '../store/user'

class Dialogue extends React.Component {
  constructor() {
    super()
    this.onClick = this.onClick.bind(this)
  }
  onClick() {
    this.props.updateUser(this.props.challengePoints)
    this.props.getChallenge(Number(this.props.challengeId) + 1)
    this.props.clearResult()
  }
  render() {
    return (
      <div className="dialogue-parent">
        <div className="dialogue-box">
          <div className="dialogue-box-text">
            {this.props.result.message.length ? (
              this.props.result.passed ? (
                <div>
                  <div>{this.props.result.message}</div>
                  <button type="button" onClick={this.onClick}>
                    {' '}
                    Move on to the next challenge!{' '}
                  </button>
                </div>
              ) : (
                <div>{this.props.result.message}</div>
              )
            ) : this.props.instructions && this.props.displayInstructions ? (
              <div>{this.props.instructions}</div>
            ) : (
              'UH-OH! Vin ran into a problem. In order to continue his journey, Vin has to fix his bad code practices. Help him out in the text editor below.'
            )}
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
  displayInstructions: state.challenge.displayInstructions,
  challengeId: state.challenge.id,
  challengePoints: state.challenge.points
})

const mapDispatch = dispatch => ({
  getResult: (codeStr, challengeId) =>
    dispatch(getResult(codeStr, challengeId)),
  getChallenge: challengeId => dispatch(getChallenge(challengeId)),
  clearResult: () => dispatch(clearResult()),
  updateUser: points => dispatch(updateUserThunk(points))
})

export default connect(mapState, mapDispatch)(Dialogue)
