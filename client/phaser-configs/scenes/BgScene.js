import Phaser from 'phaser'

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('BgScene')
  }

  preload() {
    this.load.image('city', '/assets/backgrounds/VimCityBGD.png')
  }

  create() {
    this.add
      .image(5, 5, 'city')
      .setOrigin(0)
      .setScale(0.98)
  }
}
