import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import { Outlet, useParams } from 'react-router-dom';
import ChannelNavbar from '../Channel/ChannelNavbar';
import VideoPlayerPage from './VideoPlayerPage';

function VideoPlayer(props) {
  const [video,setVideoUrl]=useState()
  const [loading,setLoading]=useState(false)
  const {id}=useParams()
  useEffect(()=>{
    axios.get(`http://localhost:5000/Content/GetOneContent/${id}`)
    .then(result=>{
      console.log(result.data)
      setVideoUrl(result.data)
      setLoading(true)
    })
    .catch(err=>{
      console.log(err)
    })
  },[id])
  return (
    <div >
      {loading?
      <>
      <Video autoPlay
            className='lg:w-4/5 h-96 lg:ml-32 md:ml-20 sm:w-full md:w-4/5'  
            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
            poster={video.ImageThumbnail}
            onCanPlayThrough={() => {
                // Do stuff
            }}>
             
            <source src={video.ContentUrl} type="video/webm" />
           
        </Video>
        <VideoPlayerPage />
        <ChannelNavbar />
        <Outlet />
        </>
        :<>Loading</>}
    </div>
  )
}

export default VideoPlayer