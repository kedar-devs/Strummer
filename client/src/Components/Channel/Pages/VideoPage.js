import React,{useState,useEffect} from 'react'
import { Grid } from '@mui/material'
import DynamicCard from '../../Card/DynamicCard'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'
function VideoPage() {
  const [channelDetails] =useOutletContext()
  console.log(channelDetails)
  const [cardDetails,setCard]=useState([])
  const [loader,setLoader]=useState(false)
  useEffect(()=>{
    axios.get(`/Content/GetChannel/${channelDetails._id}`)
    .then(result=>{
      console.log(result.data)
      setCard(result.data)
      setLoader(true)
    })
    .catch(err=>{
      console.log(err)
    })
  },[channelDetails])
  return (
    <div>
        {loader?<Grid container spacing={2}>
        {cardDetails.map((ele)=>{
            return(
                <Grid item xs={12} md={4} lg={3} sm={6}>
                  <DynamicCard cardDetail={ele}/>
                  </Grid>
            )
        })}
        </Grid>:<>Loader</>}
    </div>
  )
}

export default VideoPage