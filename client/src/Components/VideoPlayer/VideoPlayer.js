import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import { useParams } from 'react-router-dom';

function VideoPlayer(props) {
  const [videoUrl,setVideoUrl]=useState()
  const {id}=useParams()
  useEffect(()=>{
    
    axios.get(`http://localhost:5000/Content/GetOneContent/${id}`)
    .then(result=>{
      console.log(result.data.ContentUrl)
      setVideoUrl(result.data.ContentUrl)
    })
    .catch(err=>{
      console.log(err)
    })
  },[id])
  return (
    <div>
      <Video autoPlay loop muted
            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
            poster="http://sourceposter.jpg"
            onCanPlayThrough={() => {
                // Do stuff
            }}>
            <source src={videoUrl} type="video/webm" />
           
        </Video>
    </div>
  )
}

export default VideoPlayer