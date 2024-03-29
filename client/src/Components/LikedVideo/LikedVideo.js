import React,{useState,useEffect} from 'react'
import { Grid } from "@mui/material";
import DynamicCard from "../Card/DynamicCard";
import axios from "axios";
import { Bars } from 'react-loader-spinner'
function LikedVideo() {
    const [cardDetails, setCard] = useState([]);
    const [loading,setLoader]=useState(true)
    const [isData,setIsData]=useState(false)
    useEffect(()=>{
        const Token=localStorage.getItem('Token')
        if(Token){
            axios.get(`/User/GetUserId/${Token}`)
            .then(result=>{
                
                const id=result.data
                axios.get(`/Content/likes/getLikedVideos/${id}`)
                .then(result=>{
                    console.log(result.data.FoundContent)
                    setCard(result.data.FoundContent)
                    setIsData(true)
                })
                .catch(err=>{
                    console.log(err)
                })
                setLoader(false)
            })
            .catch(err=>{
                console.log(err);
            })
        }
      },[])
  return (
    <div className="h-screen">
    {loading?<div className='flex h-screen w-screen justify-center items-center'><Bars
  height="180"
  width="180"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={loading}
/></div>:
    <>
    {isData?
  <Grid container spacing={2}>
    {cardDetails.map((card) => {
      return (
        <Grid item xs={12} md={4} lg={3} sm={6}>
          <DynamicCard cardDetail={card}/>
        </Grid>
      );
    })}
  </Grid>:<></>}</>}
</div>
  )
}

export default LikedVideo