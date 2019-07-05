import Phaser from 'phaser'
import Player from '../phaser-configs/entities/player'
import Ground from '../phaser-configs/entities/ground'
import Border from '../phaser-configs/entities/border'
import Building from '../phaser-configs/entities/building'
import Pause from '../phaser-configs/entities/pause'
import store from '../store'
import {toggleDisplay} from '../store/challenge'
import {yellow100} from 'material-ui/styles/colors'
import {dummyBorders} from './level0vars'

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

    this.load.image('border', 'assets/sprites/transparent.png')
    this.load.image('building1', 'assets/sprites/transparentBLD.png')
    this.load.image('donut_shop', 'assets/sprites/transparentBLD.png')
    this.load.image('music_store', 'assets/sprites/transparentBLD.png')
    this.load.image('pet_store', 'assets/sprites/transparentBLD.png')

    this.load.image('pause', 'assets/sprites/codingIcon-small.png')
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

  createGroups() {
    this.borderGroup = this.physics.add.staticGroup({classType: Border})

    //building1
    this.buildingGroup = this.physics.add.staticGroup({classType: Building})
    this.buildingGroup.create(280, 520, 'building1')
    this.buildingGroup.immovable = true
    this.buildingGroup.moves = false
    this.buildingGroup.enable = true

    //building2
    this.secondBuilding = this.physics.add.staticGroup({classType: Building})
    this.secondBuilding.create(460, 380, 'donut_shop')
    this.secondBuilding.immovable = true
    this.secondBuilding.moves = false
    this.secondBuilding.enable = true

    //building3
    this.thirdBuilding = this.physics.add.staticGroup({classType: Building})
    this.thirdBuilding.create(140, 160, 'music_store')
    this.thirdBuilding.immovable = true
    this.thirdBuilding.moves = false
    this.thirdBuilding.enable = true

    //building4
    this.fourthBuilding = this.physics.add.staticGroup({classType: Building})
    this.fourthBuilding.create(700, 220, 'pet_store')
    this.fourthBuilding.immovable = true
    this.fourthBuilding.moves = false
    this.fourthBuilding.enable = true

    this.createBorders(dummyBorders)
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
    this.createGroups()
    // this.building = new Building(this, 50, 200, 'dummyTarget').setScale(0.25)
    // this.player = new Player(this, 25, 575, 'josh').setScale(0.1)
    this.player = new Player(
      this,
      store.getState().challenge.startingCoordinates[0],
      store.getState().challenge.startingCoordinates[1],
      'josh'
    ).setScale(0.05)
    this.physics.add.collider(this.player, this.borderGroup)
    this.physics.add.collider(this.borderGroup, this.player)

    this.colliderActivated1 = store.getState().challenge.activeColliders[0]
    this.colliderActivated2 = store.getState().challenge.activeColliders[1]
    this.colliderActivated3 = store.getState().challenge.activeColliders[2]
    this.colliderActivated4 = store.getState().challenge.activeColliders[3]

    //building1

    this.physics.add.overlap(
      this.buildingGroup,
      this.player,
      () => {
        console.log('collide!!')
        store.dispatch(toggleDisplay())
        this.colliderActivated1 = false
      },
      () => this.colliderActivated1
    )

    //building2

    this.physics.add.overlap(
      this.secondBuilding,
      this.player,
      () => {
        console.log('collide!!')
        store.dispatch(toggleDisplay())
        this.colliderActivated2 = false
      },
      () => this.colliderActivated2
    )

    //building3

    this.physics.add.overlap(
      this.thirdBuilding,
      this.player,
      () => {
        console.log('collide!!')
        store.dispatch(toggleDisplay())
        this.colliderActivated3 = false
      },
      () => this.colliderActivated3
    )

    //building4

    this.physics.add.overlap(
      this.fourthBuilding,
      this.player,
      () => {
        console.log('collide!!')
        store.dispatch(toggleDisplay())
        this.colliderActivated4 = false
      },
      () => this.colliderActivated4
    )

    this.pause = new Pause(this, 400, 300, 'pause').setScale(0.75)
    this.pause.setVisible(false)

    this.enableKeys()
    store.subscribe(() => {
      if (!store.getState().challenge.displayInstructions) {
        this.cursors = {}
        this.pause.setVisible(true)
      } else if (store.getState().challenge.displayInstructions) {
        this.pause.setVisible(false)
        this.enableKeys()
      }
    })
  }

  update(time, delta) {
    this.player.update(this.cursors)
  }
}
