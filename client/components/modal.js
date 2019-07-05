import React from 'react'
import {connect} from 'react-redux'
import {toggleClose} from '../store/modal'

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: true
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  openModal() {
    this.setState({
      isModalOpen: true
    })
  }

  closeModal() {
    this.setState({
      isModalOpen: false
    })
    this.props.toggleClose()
  }
  componentDidMount() {
    if (this.props.modalOpen === false) {
      this.openModal()
    } else {
      this.closeModal()
    }
  }
  render() {
    return (
      <div className="buttonContainer">
        <div>
          {this.state.isModalOpen === true ? (
            <div>
              <div
                className={this.openModal ? 'modal modal--is-open' : 'modal'}
              >
                <button type="button" onClick={this.closeModal}>
                  Start Playing!
                </button>

                <p>
                  Vin is visiting for vacation and is having a very hard time
                  getting around. Help Vin out by following these Vim
                  commands.Vim has two mode . 1. Insert mode (Where you can just
                  type like normal text editor. Press i for insert mode) 2.
                  Command mode (Where you give commands to the editor to get
                  things done . Press ESC for command mode) THESE INSTRUCTIONS
                  CAN BE FOUND AT THE BOTTOM OF THE SCREEN
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    modalOpen: state.modalOpen.modalOpen
  }
}

const mapDispatch = dispatch => ({
  toggleClose: () => dispatch(toggleClose())
})

export default connect(mapState, mapDispatch)(Modal)
