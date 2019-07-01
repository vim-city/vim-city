import Phaser from 'phaser'

//Buildings are static. When a player collides with it, the scene will prompt the Vim Shell to display the next challenge.

export default class Building extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey)
    this.scene = scene
    // this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.immovable = true
    this.allowGravity = false
    this.moves = false
    this.enable = true
  }

  update() {}
}
