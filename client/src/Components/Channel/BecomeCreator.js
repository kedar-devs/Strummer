import React from 'react'
import backGround from './../../Assets/bgCreator.png'
function BecomeCreator() {
  return (
    
    <div className='bg-contain bg-center w-full bg-no-repeat h-screen' style={{backgroundImage:`url(${backGround})`}}>
        <div class="absolute bg-black opacity-40 inset-0 z-0"></div>
        <div class="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">

            We noticed that you dont have any content or channel yet, if you want to change it click here
        </div>
    </div>

  )
}

export default BecomeCreator