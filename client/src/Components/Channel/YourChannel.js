import React,{useEffect,useState} from "react";
import YourChannelHeading from "./YourChannelHeading";
import ChannelNavbar from "./ChannelNavbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function YourChannel() {
  const [channelDetail,setChannel]=useState()
  const selectorData=useSelector(STATE=>STATE.channel)
  useEffect(()=>{
    const channelId=selectorData.channelId
    console.log(channelId)
    axios.get(`http://localhost:5000/Channel/GetOneChannel/${channelId}`)
    .then(result=>{
      console.log(result.data)
      setChannel(result.data)

    })
    .catch(err=>{
      console.log(err)

    })
  },[selectorData])
  return (
    <div>
      <YourChannelHeading channelInfo={channelDetail} />
      <ChannelNavbar />
      <Outlet />
    </div>
  );
}

export default YourChannel;
