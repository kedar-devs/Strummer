import React,{useState,useEffect} from 'react'
import { Grid } from '@mui/material'
import DynamicCard from '../Card/DynamicCard'
import axios from 'axios'
import { Bars } from 'react-loader-spinner'

function Home() {
  const [cards,setCard]=useState([])
  const [loader,setLoader]=useState(false)
  useEffect(()=>{
    axios.get('/Content/GetContent')
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
    {loader?<div className='min-h-screen'>
        <Grid container spacing={2}>
        {cards.map((card)=>{
                return  <Grid item xs={12} md={4} lg={3} sm={6}>
                  <DynamicCard cardDetail={card}/>
                  </Grid>
        })}
           </Grid>
           
       
    </div>:<div className='h-screen'> <div className='flex h-screen w-screen justify-center items-center'><Bars
  height="180"
  width="180"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={!loader}
/></div></div>}
    </>
  )
}

export default Home