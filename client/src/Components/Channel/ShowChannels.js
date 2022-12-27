import React, { useEffect, useState } from "react";
import Dp from '../../Assets/dance.jpg'
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
  const dispatch=useDispatch()
  const action=bindActionCreators(channelActionCreator,dispatch)
  const navigation=useNavigate()
  const selectorData=useSelector(STATE=>STATE.channel)
  useEffect(()=>{
    let creatorId=selectorData.creatorId
    axios.get(`http://localhost:5000/Channel/GetCreatorsCahnnel/${creatorId}`)
    .then(result=>{
      console.log(result.data)
      setChannel(result.data)
    })
  },[])
  const gotoChannel=(id)=>{
    action.AddChannelId(id)
    navigation(`/YourChannel/${id}`)
  }
  const navigate=()=>{
   
    action.AddCreatorId(props.creator[0]._id)
    navigation(`/CreateChannel`)
  }
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-12 text-white h-screen" >
      {channels.map((channel) => {
        return (
          <div className="max-w-sm rounded overflow-hidden shadow-lg m-5 h-60" style={{backgroundColor:'#282c34'}} onClick={()=>{gotoChannel(channel._id)}}>
      
            <img
              className="h-44 rounded-full w-44 object-center"
              src={Dp}
              alt="Sunset in the mountains"
            />
          
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            </div>
          </div>
        );
      })}
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
