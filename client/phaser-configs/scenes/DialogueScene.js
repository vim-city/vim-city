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
    this.load.image(
      'win',
      '/assets/backgrounds/YouWon-balloons1-transparent.png'
    )
  }

  create() {
    this.add
      .image(5, 5, 'city')
      .setOrigin(0)
      .setScale(0.98)
    this.dialogue = this.add
      .image(0, 0, 'dialogue')
      .setOrigin(0)
      .setScale(0.57)
    this.win = this.add
      .image(0, 0, 'win')
      .setOrigin(0)
      .setScale(0.57)
      .setVisible(false)
    console.log('57')
    //set initial display upon login
    if (!store.getState().user.won) {
      this.displayText = this.add
        .text(
          330,
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
      this.dialogue.setVisible(false)
      this.win.setVisible(true)
      this.displayText = this.add.text(
        100,
        300,
        'You won! \n Thanks for exploring Vim City with Vin.',
        {
          fontSize: '20px',
          fill: '#000000',
          wordWrap: {width: 400},
          fontFamily: 'Helvetica'
        }
      )
    }
    store.subscribe(() => {
      let {challenge, result, user} = store.getState()
      if (result.message.length >= 1) {
        //display result message
        if (result.passed && challenge.id < 4) {
          this.displayText.setText(
            result.message + '\n\nPress ESC to move on to the next challenge!'
          )
        } else if (result.passed && challenge.id === 4) {
          if (!user.won) {
            store.dispatch(updateUserThunk(challenge.points, true))
          }
          this.displayText.setText('')
          this.dialogue.setVisible(false)
          this.win.setVisible(true)
          this.displayText = this.add.text(
            100,
            300,
            'You won! \n Thanks for exploring Vim City with Vin.',
            {
              fontSize: '20px',
              fill: '#000000',
              wordWrap: {width: 400},
              fontFamily: 'Helvetica'
            }
          )
        } else {
          this.displayText.setText(result.message)
        }
      } else if (challenge.displayInstructions) {
        this.displayText.setText(
          challenge.instructions + '\n\nPress ESC to head over!'
        )
        console.log(challenge.instructions + '\n\n Press ESC to head over!')
      } else {
        console.log('code preface')
        this.displayText.setText(challenge.codePreface)
      }
    })

    this.input.keyboard.on('keydown_ESC', () => {
      console.log('ESC')
      let {challenge, result} = store.getState()
      if (challenge.displayInstructions) {
        this.scene.sleep('DialogueScene')
        this.scene.switch('MainScene')
      }
      if (result.passed && challenge.id < 4) {
        store.dispatch(updateUserThunk(challenge.points))
        store.dispatch(getChallenge(Number(challenge.id) + 1))
        store.dispatch(clearResult())
      }
    })
  }
}
