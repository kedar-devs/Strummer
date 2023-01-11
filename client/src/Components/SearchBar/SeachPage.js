import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import ChannelCard from '../Channel/ChannelCard';
import DynamicCard from '../Card/DynamicCard';
function SeachPage() {
    const [channelDetails,setChannelDetails]=useState({})
    const [channelPresent,setChannelPresent]=useState(false)
    const [contentPresent,setContentPresent]=useState(true)
    const [loading,setLoading]=useState(false)
    const [cards,setCard]=useState([])
    const {key}=useParams()
    useEffect(()=>{
        axios.get(`http://localhost:5000/Content/search/${key}`)
        .then(result=>{
          console.log(result.data)
          if(result.data.FoundChannel.length>0){
            setChannelDetails(result.data.FoundChannel)
            setChannelPresent(true)
            }
         if(result.data.FoundContent.length>0){
                setCard(result.data.FoundContent)
                setContentPresent(true)
            }
            setLoading(true)
        })   
    },[key])
  return (
    <div className='h-screen'>
        {loading?<>
            {channelPresent?
            <Grid container spacing={2}>
        {channelDetails.map((channel)=>{
            return(
                <Grid item xs={12} md={4} lg={3} sm={6}>
                  <ChannelCard channel={channel} id={channel._id} key={channel._id} showSubs={true}/>
                  </Grid>
            )
        })}
        </Grid>:<>No channel Found</>}
        <hr />
        <>
        {contentPresent?
        <Grid container spacing={2}>
        {cards.map((card)=>{
                return  <Grid item xs={12} md={4} lg={3} sm={6}>
                  <DynamicCard cardDetail={card}/>
                  </Grid>
        })}
           </Grid>:<>No Content Found</>}
           </>
        </>:<>Loading</>

        }
    </div>
  )
}

export default SeachPage