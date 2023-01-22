import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useOutletContext } from 'react-router-dom'
import { Bars } from 'react-loader-spinner'
function AboutPage() {
  const [description,setDescription]=useState({})
  const [channelInfo,setchannelInfo]=useState({})
  const [stat,setStats]=useState({})
  const [loader,setLoader]=useState(false)
  const [channelDetails]=useOutletContext()
  useEffect(()=>{

    axios.get(`http://localhost:5000/Channel/GetAboutChannel/${channelDetails._id}`)
    .then(result=>{
      setchannelInfo(result.data.channelDetails.channelInfo)
      setLoader(true)
      setDescription(result.data.channelDetails.channelDescr)
      setStats(result.data.channelDetails.stat)
    })
  },[channelDetails])
  return (
    <>{loader?
    <div className='mt-4'>
      <div className='text-center mx-auto justify-center flex '>
      <img src={channelInfo.channelImg} alt='channel profile' className='shadow rounded-full max-w-full h-36 align-middle border-none ' />
      </div>
      <h1 className='text-center text-2xl text-white'>{channelInfo.channelName}</h1>
    <div className='grid grid-cols-2 text-white mt-7'>
        <div>
            <h1>Description:</h1>
            {description}
        </div>
        <div className='flex justify-center'>
          <div className='block max-w-sm p-20 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
            <h1 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>stats</h1>
            <h3 className='font-normal text-gray-700 dark:text-gray-400'>Subscribers:{stat.channelSubCount}</h3>
            <h3 className='font-normal text-gray-700 dark:text-gray-400'>videos:{stat.videoCount}</h3>
            </div>
        </div>
    </div>
    </div>:<div className='flex h-screen w-screen justify-center items-center'><Bars
  height="180"
  width="180"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={!loader}
/></div>
}
    </>
  )
}

export default AboutPage