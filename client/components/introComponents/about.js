import React from 'react'

const About = () => {
  return (
    <div className="intro-subpage">
      <h1>Welcome to Vim City!</h1>
      <p>
        Vim City is a game designed to teach basic Vim Commands and help players
        improve their JavaScript skills.
      </p>
      <p>
        Vim is a text editor designed for efficiently moving through text
        <br />without using a mouse.
      </p>
      <p>
        <a href="https://www.vim.org/about.php" target="_blank">
          Learn more about Vim HERE.
        </a>
      </p>

      <p>Your mouseless journey through Vim City begins now...</p>
      <br />

      <div className="aboutProgress">
        <h2>HIT THE "ESC" KEY</h2>
        <h2>to move forward and go into</h2>
        <h2>COMMAND MODE</h2>
      </div>

      <br />

      <p>
        Vim City was created using Node.js, Express, Sequelize, React, Redux,<br />
        Phaser 3,Docker, Ace Shell Editor with Vim Binding,<br />Material UI,
        HTML, and CSS.
      </p>
      <p>
        <img id="github-icon" src="./introAssets/gitHubIcon.svg" /> <br />
        <a href="https://github.com/vim-city/" target="_blank">
          GitHub Repository
        </a>
      </p>
      {/* listed alpha order */}
      <p>
        Created by:
        <a href="https://github.com/dyane91" target="_blank">
          {' '}
          Dyane Avalos
        </a>,
        <a href="https://github.com/NikkiBeee" target="_blank">
          {' '}
          Nikki Bergamini
        </a>,
        <a href="https://github.com/taythompson" target="_blank">
          {' '}
          Taylor Thompson
        </a>,
        <a href="https://github.com/ssw2114" target="_blank">
          {' '}
          Stephanie Wu
        </a>
      </p>
    </div>
  )
}

export default About
