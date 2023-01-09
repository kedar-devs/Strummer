import React,{useState,useEffect} from 'react'
import { Grid } from '@mui/material'
import ChannelCard from '../ChannelCard'

import axios from 'axios'
import { useOutletContext } from 'react-router-dom'
function ChannelPage() {
  const [channels,setCard]=useState([])
  const [loader,setLoader]=useState(false)
  const [channelDetails]=useOutletContext()
  useEffect(()=>{
      
      axios.get(`http://localhost:5000/Channel/GetAllCreatorChannel/${channelDetails._id}`)
      .then(result=>{
        console.log(result.data)
        setCard(result.data.AllChannel)
        setLoader(true)
      })
      .catch(err=>{
        console.log(err)
      })
  },[channelDetails])
  return (
    <div>
         {loader?<Grid container spacing={2}>
        {channels.map((channel)=>{
            return(
                <Grid item xs={12} md={4} lg={3} sm={6}>
                  <ChannelCard channel={channel} id={channel._id} key={channel._id} showSubs={true} />
                  </Grid>
            )
        })}
        </Grid>:<>Loader</>}
    </div>
  )
}

export default ChannelPage