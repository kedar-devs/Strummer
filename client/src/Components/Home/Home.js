import React from 'react'
import { Grid } from '@mui/material'
import DynamicCard from '../Card/DynamicCard'


function Home() {
    const cards=["1","2","3","3","3"]
  return (
 
    <div className='AppHome'>
        <Grid container spacing={2}>
        {cards.map((card)=>{
                return  <Grid item xs={12} md={4} lg={3} sm={6}>
                  <DynamicCard/>
                  </Grid>
        })}
           </Grid>
       
    </div>
  )
}

export default Home