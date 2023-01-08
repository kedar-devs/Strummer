import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Outlet, useParams } from 'react-router-dom'
import ChannelHeading from '../Channel/ChannelHeading'
import ChannelNavbar from '../Channel/ChannelNavbar'
function PublicChannel() {
    const [channelDetails,setChannelDetails]=useState({})
    const [loading,setLoading]=useState(false)
    const {id}=useParams()
    useEffect(()=>{ 
        axios.get(`http://localhost:5000/Channel/GetOneChannel/${id}`)
        .then(result=>{
            if(result.data!==undefined || result.data!==null || result.data.length===0){
                setChannelDetails(result.data)
                setLoading(true)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    },[id])
  return (
    <div>
        {loading?<>
        <ChannelHeading channelInfo={channelDetails} />
        <ChannelNavbar />
        <Outlet context={[channelDetails]}/>
        </>:<></>}
    </div>
  )
}

export default PublicChannel