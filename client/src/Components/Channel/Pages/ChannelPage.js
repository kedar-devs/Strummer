import React,{useState,useEffect} from 'react'
import { Grid } from '@mui/material'
import DynamicCard from '../../Card/DynamicCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'
function ChannelPage() {
  const [cardDetails,setCard]=useState(['1','2','3'])
  const [loader,setLoader]=useState(false)
  const {id}=useParams()
  useEffect(()=>{
      
      axios.get(`http://localhost:5000/Channel/GetOneChannel/${id}`)
      .then(result=>{
        console.log(result.data)
        setCard(result.data)
        setLoader(true)
      })
      .catch(err=>{
        console.log(err)
      })
  },[id])
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

export default ChannelPage