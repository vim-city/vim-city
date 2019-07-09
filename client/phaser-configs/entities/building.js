import Phaser from 'phaser'

//Buildings are static. When a player collides with it, the scene will prompt the Vim Shell to display the next challenge.

export default class Building extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey)
    this.scene = scene
    this.scene.add.existing(this)
  }

  update() {}
}
