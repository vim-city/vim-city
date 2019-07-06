import Phaser from 'phaser'
import store from '../../store'
import {clearResult} from '../../store/result'
import {getChallenge} from '../../store/challenge'
import {updateUserThunk} from '../../store/user'

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('DialogueScene')
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITE HERE >>

    this.load.image('sky', '/assets/backgrounds/sky.png')
  }

  create() {
    this.add
      .image(-160, 0, 'sky')
      .setOrigin(0)
      .setScale(0.7)
    this.displayText = this.add
      .text(95, 250, store.getState().challenge.instructions, {
        fontSize: '15px',
        fill: '#000000'
      })
      .setVisible(true)
    store.subscribe(() => {
      let {challenge, result} = store.getState()
      if (result.message.length >= 1) {
        //display result message
        if (result.passed) {
          this.displayText.setText(
            result.message + '\n Press ESC to move on to the next challenge!'
          )
        } else {
          this.displayText.setText(result.message)
        }
      } else if (challenge.displayInstructions) {
        this.displayText.setText(challenge.instructions)
      } else {
        this.displayText.setText('Look at code window.')
      }
    })

    this.input.keyboard.on('keydown_ESC', () => {
      let {challenge, result} = store.getState()
      if (challenge.displayInstructions) {
        this.scene.sleep('DialogueScene')
        this.scene.switch('MainScene')
      }
      if (result.passed) {
        store.dispatch(updateUserThunk(challenge.points))
        store.dispatch(getChallenge(Number(challenge.id) + 1))
        store.dispatch(clearResult())
      }
    })
  }
}
