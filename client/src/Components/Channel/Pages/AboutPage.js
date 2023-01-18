import React,{useState,useEffect} from 'react'
import { useOutletContext } from 'react-router-dom'
import { Dummy,stats,CreatorInfo } from '../../DummyTexts/LoremIpsum'
function AboutPage() {
  const [description,setDescription]=useState(Dummy)
  const [about,setAbout]=useState(CreatorInfo)
  const [stat,setStats]=useState(stats)
  return (
    <div className='mt-4'>
      <div className='text-center mx-auto justify-center flex '>
      <img src={'https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg'} alt='channel profile' className='shadow rounded-full max-w-full h-36 align-middle border-none ' />
      </div>
      <h1 className='text-center text-2xl text-white'>Channel Name</h1>
    <div className='grid grid-cols-2 text-white mt-7'>
        <div>
            <h1>Description:</h1>
            {description}
            <h1>About:</h1>
            {about}
        </div>
        <div className='flex justify-center'>
          <div className='block max-w-sm p-20 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
            <h1 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>stats</h1>
            <h3 className='font-normal text-gray-700 dark:text-gray-400'>Subscribers:{stat.channelSubCount}</h3>
            <h3 className='font-normal text-gray-700 dark:text-gray-400'>videos:{stat.videoCount}</h3>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AboutPage