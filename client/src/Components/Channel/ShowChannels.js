import React, { useEffect, useState } from "react";
import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import { channelActionCreator } from "../../State";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import {AiOutlinePlus} from 'react-icons/ai'
import axios from "axios";

//BsPlusCircleDotted
function ShowChannels(props) {
  const [channels,setChannel] = useState({});
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()
  const action=bindActionCreators(channelActionCreator,dispatch)
  const navigation=useNavigate()
  const selectorData=useSelector(STATE=>STATE.channel)
  let creatorId=selectorData.creatorId
  useEffect(()=>{
    axios.get(`http://localhost:5000/Channel/GetCreatorsCahnnel/${creatorId}`)
    .then(result=>{
      console.log(result.data)
      if(result.data!==undefined || result.data!==null || result.data.length===0){
      setChannel(result.data)
      setLoading(true)
      }
    })
  },[creatorId])
  const gotoChannel=(id)=>{
    action.AddChannelId(id)
    navigation(`/YourChannel/${id}`)
  }
  const navigate=()=>{
    console.log(props)
    action.AddCreatorId(props.creators[0]._id)
    navigation(`/CreateChannel`)
  }
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-12 text-white h-screen" >
      {loading?<>{channels.map((channel) => {
        return (
          <div className="max-w-sm rounded overflow-hidden shadow-lg m-5 h-60" style={{backgroundColor:'#282c34'}} onClick={()=>{gotoChannel(channel._id)}}>
      
            <img
              className="h-44 rounded-full w-44 object-center"
              src="https://images.unsplash.com/photo-1568861368385-3534aca5cf41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
              alt="Sunset in the mountains"
            />
          
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{channel.channelName}</div>
            </div>
          </div>
        );
      })}</>:<></>}
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-5 h-60 " style={{backgroundColor:'#282c34'}} onClick={()=>{navigate()}}>
      <AiOutlinePlus size={120} className='border-2 rounded-full border-dashed'/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Add New Channel</div>
      </div>
    </div>

    </div>
  );
}

export default ShowChannels;
