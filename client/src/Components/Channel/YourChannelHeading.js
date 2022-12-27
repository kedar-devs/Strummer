import React,{useState,useEffect} from 'react'

function YourChannelHeading(props) {
    const [channel,setChannel]=useState({})
    useEffect(()=>{
        setChannel(props.channelInfo)
    },[props])
  return (
    <div className='grid grid-col-6 mt-10'>
            <div className='grid grid-cols-6'>
                <div className='w-6/12 sm:w-4/12 px-4 ml-40'>
                    <img src={'https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg'} alt='channel profile' className='shadow rounded-full max-w-full h-auto align-middle border-none' />
                </div>
                <div className='col-span-2'>
                    <h1 className="text-2xl">{channel.channelName}</h1>
                    <p>Subscriber:{channel.channelSubCount}</p>
                </div>
            </div>
            <div className=" ml-24">
                <button className='bg-black rounded text-white m-2 p-2'>Manage Channel</button>
                <button className='bg-black rounded text-white m-2 p-2'>Add Video</button>
            </div>

        </div>
  )
}

export default YourChannelHeading