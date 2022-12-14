import React,{useState,useEffect} from 'react'
import { Grid } from '@mui/material'
import DynamicCard from '../Card/DynamicCard'
import axios from 'axios'

function Home() {
  const [cards,setCard]=useState([])
  const [loader,setLoader]=useState(false)
  useEffect(()=>{
    axios.get('http://localhost:5000/Content/GetContent')
    .then(result=>{
      setCard(result.data)
      setLoader(true)
      console.log(result)
    })
    .catch(err=>{
      console.log(err)
    })
    },[])
    // const cards=["1","2","3","3","3"]
  return (
    <>
    {loader?<div className='h-screen'>
        <Grid container spacing={2}>
        {cards.map((card)=>{
                return  <Grid item xs={12} md={4} lg={3} sm={6}>
                  <DynamicCard cardDetail={card}/>
                  </Grid>
        })}
           </Grid>
           
       
    </div>:<div className='h-screen'> Loading.....</div>}
    </>
  )
}

export default Home