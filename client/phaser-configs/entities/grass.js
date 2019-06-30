import Phaser from 'phaser'

//Grass is a static body that simply blocks player from entering it

export default class Grass extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey)
    this.scene = scene
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
  }
}
