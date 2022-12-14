import React from 'react'

function Comment() {
  return (
    <div className='grid grid-cols-4'>
        <div className="w-2/12">
                <img
                  src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                  alt="..."
                  className="shadow rounded-full max-w-full h-auto align-middle border-none"
                />
              </div>
        <div className='col-span-2'>
            comment
        </div>
        <div>
            <button>:</button>
        </div>
    </div>
  )
}

export default Comment