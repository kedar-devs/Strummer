import React,{useState,useEffect} from 'react'
import CreatorHeading from './CreatorHeading';
import ShowChannel from './ShowChannels'
import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import { channelActionCreator } from "../../State";
import BecomeCreator from './BecomeCreator';

import axios from 'axios';
function Channel() {
  const [isNotCreator,setCreatorBool]=useState(false)
  const [Creator,setCreator]=useState({})

  const action=bindActionCreators(channelActionCreator,useDispatch())
  useEffect(()=>{
    const Token=localStorage.getItem('Token')
    axios.get(`/Creator/GetFromParent/${Token}`)
    .then(result=>{
        setCreator(result.data.FoundCreator)
        action.AddCreatorId(result.data.FoundCreator[0]._id)
        setCreatorBool(result.data.isFound)
    })
    .catch(err=>{
      console.log(err)
    })
  },[action])
  return (
    <div>
      {isNotCreator?
      <div>
      <CreatorHeading creatorInfo={Creator}/>
      <ShowChannel creators={Creator}/>
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