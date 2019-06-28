import Phaser from 'phaser'
import config from './config'
import MainScene from './MainScene'
import BgScene from './BgScene'
import FgScene from './FgScene'

class Game extends Phaser.Game {
  constructor() {
    super(config)

    this.scene.add('BgScene', BgScene)
    this.scene.add('FgScene', FgScene)
    this.scene.add('MainScene', MainScene)
    this.scene.start('MainScene')
  }
}

export default Game
