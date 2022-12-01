import React from 'react'
import { Grid } from '@mui/material'
import DynamicCard from '../Card/DynamicCard'
function VideoPage() {
  return (
    <div>
         <Grid container spacing={2}>
        {cardDetails.map((ele)=>{
            return(
                <Grid item xs={12} md={4} lg={3} sm={6}>
                  <DynamicCard/>
                  </Grid>
            )
        })}
        </Grid>
    </div>
  )
}

export default VideoPage