import Phaser from 'phaser'

export default class Building extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey)
    // Store reference of scene passed to constructor
    this.scene = scene
    // Add gun to scene and enable physics
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
  }

  // Check if the shoot button is pushed and how long its been since last fired
  update(time, player, cursors, fireLaserFn, laserSound) {
    if (cursors.space.isDown && time > this.lastFired) {
      if (player.armed) {
        laserSound.play()
        fireLaserFn()
        this.lastFired = time + this.fireDelay
      }
    }
  }
}
