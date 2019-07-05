export default {
  type: Phaser.AUTO, // Specify the underlying browser rendering engine (AUTO, CANVAS, WEBGL)
  // AUTO will attempt to use WEBGL, but if not available it'll default to CANVAS
  width: 785, // Game width in pixels
  height: 585, // Game height in pixels
  parent: 'phaser-game',
  render: {
    pixelArt: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0}, // Top down game, so no gravity
      debug: false
    }
  }
}
