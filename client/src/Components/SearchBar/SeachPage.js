import React,{useState,useEffect} from 'react'
import { Grid } from '@mui/material';
import ChannelCard from '../Channel/ChannelCard';
import DynamicCard from '../Card/DynamicCard';
function SeachPage(props) {
    const [channelDetails,setChannelDetails]=useState({})
    const [channelPresent,setChannelPresent]=useState(false)
    const [contentPresent,setContentPresent]=useState(true)
    const [loading,setLoading]=useState(false)
    const [cards,setCard]=useState([])
    useEffect(()=>{
        if(props.channelDetails.length>0){
        setChannelDetails(props.channelDetails)
        setChannelPresent(true)
        }
        else if(props.ContentDetails.length>0){
            setCard(props.ContentDetails)
            setContentPresent(true)
        }
        setLoading(true)
        
    },[props])
  return (
    <div>
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