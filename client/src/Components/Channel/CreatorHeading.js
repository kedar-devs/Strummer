import React from 'react'

function CreatorHeading() {
  return (
    <div className='grid grid-col-6 mt-10'>
            <div className='grid grid-cols-6'>
                <div className='w-6/12 sm:w-4/12 px-4 ml-40'>
                    <img src={'https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg'} alt='channel profile' className='shadow rounded-full max-w-full h-auto align-middle border-none' />
                </div>
                <div className='col-span-2'>
                    <h1 className="text-2xl">Channel Name</h1>
                    <p>Other details</p>
                </div>
            </div>    
    </div>
  )
}

export default CreatorHeading