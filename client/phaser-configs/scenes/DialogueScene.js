import Phaser from 'phaser'
import store from '../../store'
import {clearResult} from '../../store/result'
import {getChallenge} from '../../store/challenge'
import {updateUserThunk} from '../../store/user'

export default class DialogueScene extends Phaser.Scene {
  constructor() {
    super('DialogueScene')
  }

  preload() {
    this.load.image(
      'dialogue',
      '/assets/backgrounds/DialogueBGD1-translucent.png'
    )
    this.load.image('city', '/assets/backgrounds/VimCityBGD.png')
    this.load.image('win', '/assets/backgrounds/you-won-panda.png')
    this.load.image('hat', '/assets/backgrounds/party-hat-2.png')
  }

  create() {
    this.add
      .image(5, 5, 'city')
      .setOrigin(0)
      .setScale(0.98)
    this.dialogue = this.add
      .image(-20, 0, 'dialogue')
      .setOrigin(0)
      .setScale(0.57)
    this.hat = this.add
      .image(37, 308, 'hat')
      .setOrigin(0)
      .setScale(0.18)
      .setAngle(-3)
      .setVisible(false)
    this.win = this.add
      .image(-20, 0, 'win')
      .setOrigin(0)
      .setScale(0.55)
      .setVisible(false)
    //set initial display upon login
    if (!store.getState().user.won) {
      this.hat.setVisible(false)
      this.displayText = this.add
        .text(
          290,
          120,
          store.getState().challenge.instructions +
            '\n\nPress ESC to head over!',
          {
            fontSize: '20px',
            fill: '#000000',
            wordWrap: {width: 400},
            fontFamily: 'Helvetica'
          }
        )
        .setVisible(true)
    } else {
      this.hat.setVisible(false)
      this.dialogue.setVisible(false)
      this.win.setVisible(true)
      this.displayText = this.add.text(
        95,
        200,
        'Hey, you won!\n\nThanks for navigating Vin.',
        {
          fontSize: '20px',
          fill: '#000000',
          wordWrap: {width: 300},
          fontFamily: 'Helvetica'
        }
      )
    }
    store.subscribe(() => {
      let {challenge, result, user} = store.getState()
      if (result.message.length >= 1) {
        //display result message
        if (result.passed && challenge.id < 4) {
          this.hat.setVisible(true)
          this.displayText.setText(
            result.message + '\n\nPress ESC to move on to the next challenge!'
          )
        } else if (result.passed && challenge.id === 4) {
          if (!user.won) {
            store.dispatch(updateUserThunk(challenge.points, true))
          }
          this.hat.setVisible(false)
          this.displayText.setText('')
          this.dialogue.setVisible(false)
          this.win.setVisible(true)
          this.displayText = this.add.text(
            95,
            300,
            'Hey, you won! \n Thanks for navigating Vin.',
            {
              fontSize: '20px',
              fill: '#000000',
              wordWrap: {width: 300},
              fontFamily: 'Helvetica'
            }
          )
        } else {
          this.hat.setVisible(false)
          this.displayText.setText(result.message)
        }
      } else if (challenge.displayInstructions) {
        this.hat.setVisible(false)
        this.displayText.setText(
          challenge.instructions + '\n\nPress ESC to head over!'
        )
      } else {
        this.hat.setVisible(false)
        this.displayText.setText(challenge.codePreface)
      }
    })

    this.input.keyboard.on('keydown_ESC', async () => {
      console.log('ESC')
      let {challenge, result} = store.getState()
      if (challenge.displayInstructions) {
        this.scene.sleep('DialogueScene')
        this.scene.switch('MainScene')
      }
      if (result.passed && challenge.id < 4) {
        await store.dispatch(clearResult())
        await store.dispatch(getChallenge(Number(challenge.id) + 1))
        store.dispatch(updateUserThunk(challenge.points))
      }
    })
  }
}
