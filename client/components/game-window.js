import React from 'react'
import Phaser from 'phaser'
import Game from '../phaser-configs/index'

export default class GameWindow extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    const gameInstance = new Game()
    return gameInstance
  }
  render() {
    return <div id="phaser-game" />
  }
}
