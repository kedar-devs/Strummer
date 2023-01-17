import React,{useState,useEffect} from 'react'
import { Grid } from '@mui/material'
import ChannelCard from '../Channel/ChannelCard'
import axios from 'axios'


function Subscription() {
    const [channelDetails,setCard]=useState({})
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
      const Token=localStorage.getItem('Token')
      if(Token){
      axios.get(`http://localhost:5000/User/GetUserId/${Token}`)
      .then(user=>{
        const userId=user.data
        axios.get(`http://localhost:5000/Channel/GetSubscription/${userId}`)
        .then(Channel=>{
            console.log(Channel.data)
            setCard(Channel.data)
            setLoading(true)
        })
      })
      .catch(err=>{
          console.log(err)
      })
      }
    },[])
  return (
    <div className='min-h-screen'>
      {loading?
        <Grid container spacing={2}>
        {channelDetails.map((channel)=>{
            return(
                <Grid item xs={12} md={4} lg={3} sm={6}>
                  <ChannelCard channel={channel} id={channel._id} key={channel._id} showSubs={true}/>
                  </Grid>
            )
        })}
        </Grid>:<></>}
    </div>
  )
}

export default Subscription