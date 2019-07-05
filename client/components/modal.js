import React from 'react'
class Modal extends React.Component {
  render() {
    const {isOpen, onClose} = this.props

    return (
      <div className={isOpen ? 'modal modal--is-open' : 'modal'}>
        <button type="button" onClick={onClose}>
          Start Playing!
        </button>

        <p>
          Vin is visiting for vacation and is having a very hard time getting
          around. Help Vin out by following these Vim commands.Vim has two mode
          . 1. Insert mode (Where you can just type like normal text editor.
          Press i for insert mode) 2. Command mode (Where you give commands to
          the editor to get things done . Press ESC for command mode) THESE
          INSTRUCTIONS CAN BE FOUND AT THE BOTTOM OF THE SCREEN
        </p>
      </div>
    )
  }
}

export default Modal
