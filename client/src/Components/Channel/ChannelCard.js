import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import { channelActionCreator } from "../../State";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function ChannelCard(props) {
    const dispatch=useDispatch()
    const action=bindActionCreators(channelActionCreator,dispatch)
    const navigation=useNavigate()
    const [channel,setChannel]=useState({})
    const [showSub,setShowSub]=useState(false)
    const [subStatus,setSubStatus]=useState(true)
    useEffect(()=>{
        console.log(props)
        setChannel(props.channel)
        setShowSub(props.showSubs)
    },[props])

    const gotoChannel=(id)=>{
        if(!showSub){
        action.AddChannelId(id)
        navigation(`/YourChannel/${id}`)
        }
        else{
          navigation(`/PublicChannel/${id}`)
        }
      }
    const ChangeSubscriptionStatus=(id)=>{
        if(subStatus){
          const Token=localStorage.getItem('Token')
          if(Token){
            axios.get(`http://localhost:5000/User/GetUserId/${Token}`)
            .then(result=>{
              console.log(result.data)
              const userId=result.data
              axios.delete('http://localhost:5000/Channel/RemoveSubscription',{data:{userId,id}})
              .then(result=>{
                console.log(result.data)
                setSubStatus(false)
              }).catch(err=>{
                console.log(err)
              })
            })
            .catch(err=>{
              console.log(err)
            })
          }
        }

        else{
            const Token=localStorage.getItem('Token')
            if(Token){
              axios.get(`http://localhost:5000/User/GetUserId/${Token}`)
              .then(result=>{
                console.log(result.data)
                const userId=result.data
                const channelId=id
                axios.post('http://localhost:5000/Channel/AddSubscription',{userId,channelId})
                .then(result=>{
                  console.log(result.data)
                  setSubStatus(true)
                }).catch(err=>{
                  console.log(err)
                })
              })
              .catch(err=>{
                console.log(err)
              })
            }
        }
    }
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-5 h-66" style={{backgroundColor:'#282c34'}} >
      
            <img
              className="h-44 rounded-full w-44 object-center"
              src={channel.channelImage}
              alt="Sunset in the mountains"
              onClick={()=>{gotoChannel(channel._id)}}
            />
          
            <div className="px-6 py-2" onClick={()=>{gotoChannel(channel._id)}}>
              <div className="font-bold text-xl mb-2">{channel.channelName}</div>
            </div>
            <div className='mx-3'>
                {showSub?subStatus?<button className='rounded-full border bg-red-700 px-5 text-white' onClick={()=>{ChangeSubscriptionStatus(channel._id)}}>UnSubscribed</button>:<button className='rounded-full border bg-red-700 px-5 text-white' onClick={()=>{ChangeSubscriptionStatus(channel._id)}}>Subscribe</button>:<></>}
            </div>
          </div>
  )
}

export default ChannelCard