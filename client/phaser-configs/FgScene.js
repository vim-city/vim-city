import Phaser from 'phaser'
import Player from '../phaser-configs/entities/player'
import Ground from '../phaser-configs/entities/ground'

export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene')
  }

  preload() {
    this.load.spritesheet('josh', 'assets/spriteSheets/josh.png', {
      frameWidth: 340,
      frameHeight: 460
    })
    this.load.image('ground', 'assets/sprites/ground.png')
  }
  createGround(x, y) {
    this.groundGroup.create(x, y, 'ground')
  }
  createGroups() {
    this.groundGroup = this.physics.add.staticGroup({classType: Ground})

    this.createGround(160, 540)
    this.createGround(600, 540)
  }

  create() {
    this.createGroups()
    this.player = new Player(this, 30, 400, 'josh').setScale(0.25)
    this.physics.add.collider(this.player, this.groundGroup)
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.K,
      down: Phaser.Input.Keyboard.KeyCodes.J,
      left: Phaser.Input.Keyboard.KeyCodes.H,
      right: Phaser.Input.Keyboard.KeyCodes.L
    })
  }

  update(time, delta) {
    this.player.update(this.cursors)
  }
}
