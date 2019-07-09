import React from 'react'
import Game from '../phaser-configs/index'

export default class GameWindow extends React.Component {
  componentDidMount() {
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
