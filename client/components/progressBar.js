import React from 'react'

const ProgressBar = props => {
  return (
    <div>
      {props.currentStep === 0 && <img src="/introAssets/progressBar0.png" />}
      {props.currentStep === 1 && <img src="/introAssets/progressBar1.png" />}
      {props.currentStep === 2 && <img src="/introAssets/progressBar2.png" />}
    </div>
  )
}

export default ProgressBar
