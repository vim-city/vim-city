import Phaser from 'phaser'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene')
  }

  create() {
    // << LOAD BACKGROUND AND FOREGROUND SCENES IN PARALLEL HERE >>
    this.scene.launch('BgScene')
    this.scene.launch('FgScene')
    this.input.on('pointerup', () => {
      // Add your code below:
      this.scene.pause('FgScene')
    })
  }
}
