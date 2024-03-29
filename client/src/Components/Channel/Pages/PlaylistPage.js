import React,{useState,useEffect} from 'react'
import { Grid } from '@mui/material'
import DynamicCard from '../../Card/DynamicCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'
function PlayListPage() {
    const [cardDetails,setCard]=useState(['1','2','3'])
    const [loader,setLoader]=useState(false)
    const {id}=useParams()
    useEffect(()=>{
      
      axios.get(`/Content/Playlist/GetChannelPlaylist/${id}`)
      .then(result=>{
        
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

export default PlayListPage