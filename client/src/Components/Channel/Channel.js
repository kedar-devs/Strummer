import React,{useState,useEffect} from 'react'
import ChannelHeading from './ChannelHeading'
// import ChannelNavbar from './ChannelNavbar'
import BecomeCreator from './BecomeCreator';

import axios from 'axios';
function Channel() {
  const [isNotCreator,setCreatorBool]=useState(false)
  const [Creator,setCreator]=useState({})
  useEffect(()=>{
    const Token=localStorage.getItem('Token')
    axios.get(`http://localhost:5000/Creator/GetFromParent/${Token}`)
    .then(result=>{
      console.log(result)
        setCreator(result.data.FoundCreator)
        setCreatorBool(result.data.isFound)
    })
    .catch(err=>{
      console.log(err)
      setCreatorBool(err.data.isFound)
    })
  },[])
  return (
    <div>
      {isNotCreator?
      <div>
      <ChannelHeading />
      </div>:
      <BecomeCreator/>
    }
      {/* <ChannelHeading />
      <ChannelNavbar /> */}
       {/* <Outlet /> */}
   
    </div>
  )
}

export default Channel