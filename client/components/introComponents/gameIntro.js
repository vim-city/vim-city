import React from 'react'

const GameIntro = () => {
  return (
    <div className="intro-subpage">
      <h1>Navigating Through Vim City</h1>
      <p>By hitting the "ESC" key you're now in COMMAND MODE.\n</p>
      <p>
        This means that the keys on your keyboard will function differently.\n
      </p>
      <p>
        To introduce you to each new keystroke, we'll have you navigate in the
        game for a visualization.\n
      </p>
      <p>
        Once you hit the target, the game will freeze until you apply the Vim
        command in the text editor to solve the coding challenge.\n
      </p>
      <img src="./introAssets/PhaserGame.gif" />
      <p>You'll need the "ESC" key in the editor...</p>
      <div className="aboutProgress">
        <h2>HIT THE "ESC" KEY</h2>
        <h2>for COMMAND MODE in the editor</h2>
        <h2>and to move forward</h2>
      </div>
    </div>
  )
}

export default GameIntro
