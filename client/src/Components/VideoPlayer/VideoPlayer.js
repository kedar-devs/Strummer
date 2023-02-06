import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import { Outlet, useParams } from 'react-router-dom';
import ChannelNavbar from '../Channel/ChannelNavbar';
import VideoPlayerPage from './VideoPlayerPage';
import { Bars } from 'react-loader-spinner'

function VideoPlayer(props) {
  const [video,setVideoUrl]=useState()
  const [channel,setChannelDetail]=useState()
  const [channelDetails,setChannelDetails]=useState({})
  const [loading,setLoading]=useState(false)
  const {id}=useParams()
  useEffect(()=>{
    axios.get(`/Content/GetOneContent/${id}`)
    .then(result=>{
      
      setVideoUrl(result.data.Content)
      setChannelDetail(result.data.ChannelDetail)
      setChannelDetails(result.data.ChannelDetail)
      setLoading(true)
    })
    .catch(err=>{
      console.log(err)
    })
  },[id])
  const Handler=()=>{
    console.log('Ended')
    axios.get(`/Content/IncreaseCount/${id}`)
    .then(result=>{
      
      setVideoUrl({...video,viewCount:result.data.viewCount})
    })
    .catch(err=>{
      console.log(err)
    })
  

  }
  return (
    <div >
      {loading?
      <>
      <Video autoPlay
            onEnded={()=>{Handler()}}
            id="videos"
            className='lg:w-4/5 h-96 lg:ml-32 md:ml-20 sm:w-full md:w-4/5'  
            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
            poster={video.ImageThumbnail}
            onCanPlayThrough={() => {
                // Do stuff
            }}
            >
             
            <source src={video.ContentUrl} type="video/webm" />
           
        </Video>
        <div className='grid grid-cols-1'>
        <VideoPlayerPage videoInfo={video} channelInfo={channel}/>
        <ChannelNavbar />
        <Outlet context={[channelDetails]}/>
        </div>
        </>
        :<div className='flex h-screen w-screen justify-center items-center'><Bars
        height="180"
        width="180"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={!loading}
      /></div>}
    </div>
  )
}

export default VideoPlayer