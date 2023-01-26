import React,{useEffect,useState} from "react";
import YourChannelHeading from "./YourChannelHeading";
import ChannelNavbar from "./ChannelNavbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Bars } from 'react-loader-spinner'
import axios from "axios";

function YourChannel() {
  const [channelDetail,setChannel]=useState()
  const [loading,setLoader]=useState(true)
  const selectorData=useSelector(STATE=>STATE.channel)
  useEffect(()=>{
    const channelId=selectorData.channelId
    console.log(channelId)
    axios.get(`/ChannelRoute/GetOneChannel/${channelId}`)
    .then(result=>{
      console.log(result.data)
      setChannel(result.data)
      setLoader(false)

    })
    .catch(err=>{
      console.log(err)

    })
  },[selectorData])
  return (
    <>
    {loading?<div className='flex h-screen w-screen justify-center items-center'><Bars
  height="180"
  width="180"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={loading}
/></div>:
    <div>
      <YourChannelHeading channelInfo={channelDetail} />
      <ChannelNavbar />
      <Outlet context={[channelDetail]}/>
    </div>
  }
  </>
  );
}

export default YourChannel;
