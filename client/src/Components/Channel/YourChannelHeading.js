import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { channelActionCreator } from '../../State'
import { bindActionCreators } from 'redux'
import { useNavigate } from 'react-router-dom'

function YourChannelHeading(props) {
    const [channel,setChannel]=useState({})
    const action=bindActionCreators(channelActionCreator,useDispatch())
    const navigator=useNavigate()
    useEffect(()=>{
        console.log('from headr',props.channelInfo)
        setChannel(props.channelInfo)
    },[props])
    const addVideo=(id)=>{
        action.AddChannelId(id)
        navigator('/AddContent')
    }
  return (
    <div className='grid grid-col-6 mt-10'>
            <div className='grid grid-cols-6'>
                <div className='w-6/12 sm:w-4/12 px-4 ml-40'>
                    <img src={channel.channelImage} alt='channel profile' className='shadow rounded-full max-w-full h-15 align-middle border-none' />
                </div>
                <div className='col-span-2'>
                    <h1 className="text-2xl">{channel.channelName}</h1>
                    <p>Subscriber:{channel.channelSubCount}</p>
                </div>
            </div>
            <div className=" ml-24">
                <button className='bg-black rounded text-white m-2 p-2' onClick={()=>{addVideo(channel._id)}}>Add Video</button>
            </div>

        </div>
  )
}

export default YourChannelHeading