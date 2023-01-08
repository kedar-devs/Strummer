
import React,{useState,useEffect} from 'react'
import axios from 'axios'
function ChannelHeading(props) {
    const [channel,setChannel]=useState({})
    const [loading,setLoading]=useState(false)
    const [isFollowing,setFollowing]=useState(false)
    useEffect(()=>{
        setChannel(props.channelInfo)
        let Token=localStorage.getItem('Token')
        if(Token){
          axios.get(`http://localhost:5000/User/GetUserId/${Token}`)
          .then(user=>{
            console.log(user.data)
            const userId=user.data
            const channelId=props.channelInfo._id
            axios.post('http://localhost:5000/Channel/CheckSubscription',{userId,channelId})
            .then(subStatus=>{
              setFollowing(true)
            })
            .catch(err=>{
              setFollowing(false)
            })
          })
          .catch(err=>{
            console.log(err)
          })
        }
      setLoading(true)
    },[props])
    const ChangeSubscriptionStatus=(id)=>{
        if(isFollowing){
            axios.get(`http://localhost:5000/Channel/RemoveSubscription/${id}`)
            .then(result=>{
                setFollowing(false)
            })
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
                  setFollowing(true)
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
        <>
        {loading?
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
                {isFollowing?<button className='bg-black rounded text-white m-2 p-2' onClick={()=>{ChangeSubscriptionStatus(channel._id)}}>Unsubscribe</button>:<button className='bg-black rounded text-white m-2 p-2' onClick={()=>{ChangeSubscriptionStatus(channel._id)}}>subscribe</button>}
                <button className='bg-black rounded text-white m-2 p-2'>Notify</button>
            </div>

        </div>:<></>
}
        </>
    )
}

export default ChannelHeading