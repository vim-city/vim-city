import Phaser from 'phaser'
import config from './config'
import MainScene from './scenes/MainScene'
import BgScene from './scenes/BgScene'
import FgScene from './scenes/FgScene'
import DialogueScene from './scenes/DialogueScene'
import WinScene from './scenes/WinScene'

class Game extends Phaser.Game {
  constructor() {
    super(config)

    this.scene.add('BgScene', BgScene, false)
    this.scene.add('FgScene', FgScene, false)
    this.scene.add('MainScene', MainScene, false)
    this.scene.add('WinScene', WinScene, false)
    this.scene.add('DialogueScene', DialogueScene)
    this.scene.sleep('MainScene')
    this.scene.sleep('FgScene')
    this.scene.sleep('BgScene')
    this.scene.sleep('WinScene')
    this.scene.start('DialogueScene')
  }
}

export default Game
