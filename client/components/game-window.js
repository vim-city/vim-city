import React from 'react'
// import Phaser from 'phaser'
import Game from '../phaser-configs/index'

export default class GameWindow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false
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
  }

  componentDidMount() {
    this.openModal()
    const gameInstance = new Game()
    return gameInstance
  }
  render() {
    return (
      <div>
        <div id="phaser-game" />
      </div>
    )
  }
}
