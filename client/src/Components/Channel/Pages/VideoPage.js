import React,{useState,useEffect} from 'react'
import { Grid } from '@mui/material'
import DynamicCard from '../../Card/DynamicCard'
import axios from 'axios'
function VideoPage() {
  const [cardDetails,setCard]=useState(['1','2','3'])
  const [loader,setLoader]=useState(false)
  useEffect(()=>{
    axios.get("http://localhost:5000/Content/GetContent")
    .then(result=>{
      console.log(result.data)
      setCard(result.data)
      setLoader(true)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])
  return (
    <div>
        {loader?<Grid container spacing={2}>
        {cardDetails.map((ele)=>{
            return(
                <Grid item xs={12} md={4} lg={3} sm={6}>
                  <DynamicCard cardDetails={ele}/>
                  </Grid>
            )
        })}
        </Grid>:<>Loader</>}
    </div>
  )
}

export default VideoPage