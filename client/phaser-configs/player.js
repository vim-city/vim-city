import Phaser from 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey)

    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
    this.scene = scene
    this.scene.add.existing(this)
    this.scene.physics.world.enable(this)
  }

  // Check which controller button is being pushed and execute movement & animation
  updateMovement(cursors) {
    // Move left
    if (cursors.left.isDown) {
      this.setVelocityX(-360)
    } else if (cursors.right.isDown) {
      // Move right
      this.setVelocityX(360)
    } else {
      // Neutral (no movement)
      this.setVelocityX(0)
    }
  }

  updateJump(cursors) {
    if (cursors.up.isDown) {
      this.setVelocityY(-800)
    }
  }
  update(cursors) {
    this.updateMovement(cursors)
    this.updateJump(cursors)
  }
}
