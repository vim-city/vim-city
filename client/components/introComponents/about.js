import React from 'react'

const About = () => {
  return (
    <div>
      <h1>Welcome to Vim City!</h1>
      <p>
        Vim City is a game designed to teach basic Vim Commands and help players
        improve their JavaScript skills. Vim is a text editor designed for
        efficiently moving through text without using a mouse.
        <a href="https://www.vim.org/about.php">Learn more about Vim HERE.</a>
      </p>
      <p>
        Vim City was created using Node.js, Express, Sequelize, React, Redux,
        Phaser 3, Docker, Ace Shell Editor with Vim Binding, Material UI, HTML,
        and CSS.
        <img src="./introAssets/gitHubIcon.svg" />{' '}
        <a href="https://github.com/vim-city/">GitHub Repository</a>
      </p>
      {/* listed alpha order */}
      <ul>Created by:</ul>
      <li>
        <a href="https://github.com/NikkiBeee">Nikki Bergamini</a>
      </li>
      <li>
        <a href="https://github.com/dyane91">Dyane Ramos</a>
      </li>
      <li>
        <a href="https://github.com/taythompson">Taylor Thompson</a>
      </li>
      <li>
        <a href="https://github.com/ssw2114">Stephanie Wu</a>
      </li>
      <p>Your mouseless journey through Vim City begins now...</p>

      <div className="aboutProgress">
        <h2>HIT THE "ESC" KEY</h2>
        <h2>to move forward and go into</h2>
        <h2>COMMAND MODE</h2>
      </div>
    </div>
  )
}

export default About
