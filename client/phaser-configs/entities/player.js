import Phaser from 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey)
    this.scene = scene
    this.scene.add.existing(this)
    this.scene.physics.world.enable(this)

    this.updateMovement = this.updateMovement.bind(this)
  }

  updateMovement(cursors) {
    this.body.setVelocity(0)
    // Move left
    if (cursors.left.isDown) {
      this.setVelocityX(-360)
    } else if (cursors.right.isDown) {
      // Move right
      this.setVelocityX(360)
    } else if (cursors.up.isDown) {
      // Move up
      this.setVelocityY(360)
    } else if (cursors.down.isDown) {
      // Move down
      this.setVelocityY(-360)
    } else {
      // Neutral (no movement)
      this.setVelocityX(0)
    }
  }

  update(cursors) {
    this.updateMovement(cursors)
  }
}
