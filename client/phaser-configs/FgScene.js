import Phaser from 'phaser'
import Player from '../phaser-configs/entities/player'
import Ground from '../phaser-configs/entities/ground'
import Border from '../phaser-configs/entities/border'

const dummyBorders = [
  [25, 575],
  [75, 575],
  [125, 575],
  [175, 575],
  [225, 575],
  [225, 525],
  [225, 475],
  [225, 425],
  [225, 375],
  [225, 325],
  [175, 325],
  [125, 325],
  [75, 325],
  [25, 325]
]

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
    this.load.image('border', 'assets/sprites/8bitGrass.png')
  }
  createBorders(arr) {
    //takes an array of arrays to create the boundaries of the game
    console.log('the array', arr)
    for (let i = 0; i < arr.length; ++i) {
      console.log(arr[i])
      let x = arr[i][0]
      let y = arr[i][1]
      this.borderGroup.create(x, y, 'border')
    }
    this.borderGroup.immovable = true
    this.borderGroup.allowGravity = false
    this.borderGroup.moves = false
    this.borderGroup.enable = true
  }
  createGround(x, y) {
    this.groundGroup.create(x, y, 'ground')
  }
  createGroups() {
    // this.groundGroup = this.physics.add.staticGroup({classType: Ground})

    // this.createGround(160, 540)
    // this.createGround(600, 540)

    this.borderGroup = this.physics.add.staticGroup({classType: Border})
    this.createBorders(dummyBorders)
  }

  create() {
    this.createGroups()
    this.player = new Player(this, 30, 400, 'josh').setScale(0.25)
    // this.physics.add.collider(this.player, this.groundGroup)
    this.physics.add.collider(this.player, this.borderGroup)
    this.physics.add.collider(this.borderGroup, this.player)

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.K,
      down: Phaser.Input.Keyboard.KeyCodes.J,
      left: Phaser.Input.Keyboard.KeyCodes.H,
      right: Phaser.Input.Keyboard.KeyCodes.L
    })

    //SSW: The line below tells Phaser not to prevent keystrokes from propagating to rest of browser (including vim shell)
    this.input.keyboard.removeCapture('H,J,K,L')
  }

  update(time, delta) {
    this.player.update(this.cursors)
  }
}

//SSW: when the user hits a building, we should pause game play so user can type into vim shell with the following code, which will prevent the character from moving when HJKL are pressed:

//this.scene.pause('FgScene')

//then, when the user completes typing, use this code to resume gameplay:

//this.scene.resume('FgScene')

//http://www.html5gamedevs.com/topic/37935-collider-in-group-does-not-work/
