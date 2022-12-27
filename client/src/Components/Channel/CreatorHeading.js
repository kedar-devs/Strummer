import React,{useEffect,useState} from 'react'

function CreatorHeading(props) {
  const [creatorData,setCreatorData]=useState({})
  useEffect(()=>{
    setCreatorData(props.creatorInfo[0])    
  },[props])
  return (
    <div className='grid grid-col-6 mt-10'>
            <div className='grid grid-cols-6'>
                <div className='w-6/12 sm:w-4/12 px-4 ml-40'>
                    <img src={'https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg'} alt='channel profile' className='shadow rounded-full max-w-full h-auto align-middle border-none' />
                </div>
                <div className='col-span-2'>
                    <h1 className="text-2xl">{creatorData.creatorName}</h1>
                    <p>Follower:{creatorData.followers}</p>
                </div>
            </div>    
    </div>
  )
}

export default CreatorHeading