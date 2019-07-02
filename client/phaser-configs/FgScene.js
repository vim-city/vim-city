import Phaser from 'phaser'
import Player from '../phaser-configs/entities/player'
import Ground from '../phaser-configs/entities/ground'
import Border from '../phaser-configs/entities/border'
import Building from '../phaser-configs/entities/building'
import store from '../store'
import {toggleDisplay} from '../store/challenge'

const dummyBorders = [
  [25, 25],
  [25, 75],
  [25, 125],
  [25, 175],
  [25, 225],
  [25, 275],
  [25, 325],
  [25, 375],
  [25, 425],
  [25, 475],
  [25, 525],
  [75, 25],
  [75, 75],
  [75, 125],
  [75, 175],
  [75, 225],
  [75, 275],
  [75, 325],
  [75, 375],
  [75, 425],
  [75, 475],
  [75, 525],
  [125, 25],
  [125, 75],
  [125, 325],
  [125, 375],
  [125, 425],
  [125, 475],
  [125, 525],
  [175, 175],
  [175, 225],
  [175, 325],
  [175, 375],
  [175, 425],
  [175, 475],
  [175, 525],
  [225, 175],
  [225, 225],
  [225, 325],
  [225, 375],
  [225, 425],
  [225, 475],
  [225, 525],
  [275, 25],
  [275, 75],
  [275, 175],
  [275, 225],
  [275, 325],
  [275, 375],
  [275, 425],
  [275, 475],
  [275, 525],
  [325, 25],
  [325, 75],
  [325, 175],
  [325, 225],
  [325, 325],
  [325, 375],
  [375, 25],
  [375, 75],
  [375, 175],
  [375, 225],
  [375, 325],
  [375, 375],
  [425, 25],
  [425, 75],
  [425, 175],
  [425, 225],
  [425, 325],
  [425, 375],
  [425, 475],
  [425, 525],
  [425, 575],
  [475, 25],
  [475, 75],
  [475, 175],
  [475, 225],
  [475, 325],
  [475, 375],
  [475, 475],
  [475, 525],
  [475, 575],
  [525, 25],
  [525, 75],
  [525, 175],
  [525, 225],
  [525, 475],
  [525, 525],
  [525, 575],
  [575, 25],
  [575, 75],
  [575, 175],
  [575, 225],
  [575, 275],
  [575, 475],
  [575, 525],
  [575, 575],
  [625, 25],
  [625, 75],
  [625, 175],
  [625, 225],
  [625, 275],
  [625, 475],
  [625, 525],
  [625, 575],
  [675, 25],
  [675, 75],
  [675, 175],
  [675, 225],
  [675, 275],
  [675, 325],
  [675, 375],
  [675, 425],
  [675, 475],
  [675, 525],
  [675, 575],
  [725, 25],
  [725, 75],
  [725, 175],
  [725, 225],
  [725, 275],
  [725, 475],
  [725, 525],
  [725, 575],
  [775, 25],
  [775, 75],
  [775, 475],
  [775, 525],
  [775, 575]
]

// const buildingArr = [
//   [375, 525],
//   [625, 375],
//   [175, 25],
//   [775, 400]
// ]

// const buildingType = ['building1', 'donut_shop','music_store', 'pet_store']

export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene')
    this.enableKeys = this.enableKeys.bind(this)
  }

  preload() {
    this.load.spritesheet('josh', 'assets/spriteSheets/josh.png', {
      frameWidth: 340,
      frameHeight: 460
    })
    this.load.image('ground', 'assets/sprites/ground.png')
    this.load.image('border', 'assets/sprites/grass3.png')
    this.load.image('building1', 'assets/sprites/building.png')
    this.load.image('donut_shop', 'assets/sprites/donutShop.png')
    this.load.image('music_store', 'assets/sprites/music.png')
    this.load.image('pet_store', 'assets/sprites/petStore.png')
  }

  createBorders(arr) {
    //takes an array of arrays to create the boundaries of the game

    for (let i = 0; i < arr.length; ++i) {
      let x = arr[i][0]
      let y = arr[i][1]
      this.borderGroup.create(x, y, 'border')
    }
    this.borderGroup.immovable = true
    this.borderGroup.allowGravity = false
    this.borderGroup.moves = false
    this.borderGroup.enable = true
  }

  createBuilding(x, y, building) {
    this.buildingGroup.create(x, y, building)

    this.buildingGroup.immovable = true
    this.buildingGroup.moves = false
    this.buildingGroup.enable = true
  }
  createGroups() {
    // this.groundGroup = this.physics.add.staticGroup({classType: Ground})

    // this.createGround(160, 540)
    // this.createGround(600, 540)

    this.borderGroup = this.physics.add.staticGroup({classType: Border})
    this.buildingGroup = this.physics.add.staticGroup({classType: Building})
    this.createBuilding(625, 375, 'donut_shop')
    this.createBuilding(175, 25, 'music_store')
    this.createBuilding(375, 525, 'building1')
    this.createBuilding(775, 400, 'pet_store')
    this.createBorders(dummyBorders)

    this.buildingGroup = this.physics.add.staticGroup({classType: Building})
    // this.createBuilding(375, 575)
  }
  enableKeys() {
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.K,
      down: Phaser.Input.Keyboard.KeyCodes.J,
      left: Phaser.Input.Keyboard.KeyCodes.H,
      right: Phaser.Input.Keyboard.KeyCodes.L
    })

    //SSW: The line below tells Phaser not to prevent keystrokes from propagating to rest of browser (including vim shell)
    this.input.keyboard.removeCapture('H,J,K,L')
  }

  create() {
    this.colliderActivated = true
    this.createGroups()
    // this.building = new Building(this, 50, 200, 'dummyTarget').setScale(0.25)
    this.player = new Player(this, 25, 575, 'josh').setScale(0.1)
    // this.physics.add.collider(this.player, this.groundGroup)
    this.physics.add.collider(this.player, this.borderGroup)
    this.physics.add.collider(this.borderGroup, this.player)

    this.physics.add.overlap(
      this.buildingGroup,
      this.player,
      () => {
        console.log('collide!!')
        store.dispatch(toggleDisplay())
        this.colliderActivated = false
      },
      () => this.colliderActivated
    )
    this.physics.add.overlap(this.player, this.buildingGroup)
    this.enableKeys()
    store.subscribe(() => {
      if (!store.getState().challenge.displayInstructions) {
        this.cursors = {}
      } else if (store.getState().challenge.displayInstructions) {
        this.enableKeys()
      }
    })
  }

  update(time, delta) {
    this.player.update(this.cursors)
  }
}

//http://www.html5gamedevs.com/topic/37935-collider-in-group-does-not-work/
