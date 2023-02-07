import React,{useState,useEffect} from 'react'
import { Grid } from '@mui/material'
import ChannelCard from '../Channel/ChannelCard'
import axios from 'axios'
import { Bars } from 'react-loader-spinner'

function Subscription() {
    const [channelDetails,setCard]=useState([])
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
      const Token=localStorage.getItem('Token')
      setTimeout(()=>{
        setLoading(true)
      },4000)
      if(Token){
      axios.get(`/User/GetUserId/${Token}`)
      .then(user=>{
        const userId=user.data
        
        axios.get(`/ChannelRoute/GetSubscription/${userId}`)
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
        </Grid>:<div className='flex h-screen w-screen justify-center items-center'><Bars
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

export default Subscription