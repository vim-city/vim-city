import React from 'react'

export const VimConsole = props => {
  console.log('props', props)
  return (
    <div>
      <h1>This is result:{props.result}</h1>
    </div>
  )
}
