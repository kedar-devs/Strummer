import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Outlet, useParams } from 'react-router-dom'
import ChannelHeading from '../Channel/ChannelHeading'
import ChannelNavbar from '../Channel/ChannelNavbar'
import { Bars } from 'react-loader-spinner'
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
        </>:<div className='flex h-screen w-screen justify-center items-center'><Bars
  height="180"
  width="180"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={!loading}
/></div>}
    </div>
  )
}

export default PublicChannel