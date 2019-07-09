import React from 'react'

const EditorIntro = () => {
  return (
    <div className="intro-subpage">
      <h1>Editing the Console</h1>
      <p>
        In the text editor, you'll use the Vim command to navigate the text.
      </p>
      <p>However, you need to hit 'i' to turn the Vim commands off.</p>
      <p>
        This is called INSERT MODE and all the keys will function as you know
        and love in this mode.
      </p>
      <img src="./introAssets/functionVideo.gif" />
      <p>
        If you forget any of these keys... they are at the bottom of the screen.
      </p>
      <br />
      <div className="aboutProgress">
        <h2>HIT THE "i" KEY</h2>
        <h2>for INSERT MODE in the editor</h2>
        <h2>and to start the game!</h2>
      </div>
      <br />
    </div>
  )
}

export default EditorIntro
