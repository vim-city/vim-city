import Phaser from 'phaser'

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('BgScene')
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITE HERE >>

    this.load.image('city', '/assets/backgrounds/VimCityBGD.png')
  }

  create() {
    // Create Sprites
    // << CREATE SPRITE HERE >>
    this.add
      .image(5, 5, 'city')
      .setOrigin(0)
      .setScale(0.98)
  }
}
