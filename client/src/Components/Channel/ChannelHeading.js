import React from 'react'

function ChannelHeading() {
    return (
        <div className='grid grid-col-6'>
            <div className='grid grid-cols-6'>
                <div className='w-6/12 sm:w-4/12 px-4'>
                    <img src={'https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg'} alt='channel profile' className='shadow rounded-full max-w-full h-auto align-middle border-none' />
                </div>
                <div className='col-span-2'>
                    <h1 className="text-2xl">Channel Name</h1>
                    <p>Other details</p>
                </div>
            </div>
            <div>
                <button>Subscribe</button>
                <button>Notify</button>
            </div>

        </div>
    )
}

export default ChannelHeading