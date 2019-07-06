import Phaser from 'phaser'

export default class WinScene extends Phaser.Scene {
  constructor() {
    super('WinScene')
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITE HERE >>

    this.load.image('win', '/assets/backgrounds/YouWon-balloons.png')
  }

  create() {
    this.add
      .image(0, 0, 'win')
      .setOrigin(0)
      .setScale(0.57)
    this.displayText = this.add
      .text(330, 120, 'You won! \n Thanks for helping Vin have a great day.', {
        fontSize: '20px',
        fill: '#000000',
        wordWrap: {width: 400},
        fontFamily: 'Helvetica'
      })
      .setVisible(true)
  }
}
