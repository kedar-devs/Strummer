
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
          axios.get(`/User/GetUserId/${Token}`)
          .then(user=>{
            console.log(user.data)
            const userId=user.data
            const channelId=props.channelInfo._id
            axios.post('/ChannelRoute/CheckSubscription',{userId,channelId})
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
    const Notify=()=>{
      alert('You will be Notified when the new video will be appleied')
    }
    const ChangeSubscriptionStatus=(id)=>{
        if(isFollowing){
          const Token=localStorage.getItem('Token')
          if(Token){
            axios.get(`/User/GetUserId/${Token}`)
            .then(result=>{
              
              const userId=result.data
              axios.delete('/ChannelRoute/RemoveSubscription',{data:{userId,id}})
              .then(result=>{
                
                setFollowing(false)
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
              axios.get(`/User/GetUserId/${Token}`)
              .then(result=>{
                
                const userId=result.data
                const channelId=id
                axios.post('/ChannelRoute/AddSubscription',{userId,channelId})
                .then(result=>{
                  
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
            <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-1'>
                <div className=' shrink-0 px-4 ml-40'>
                    <img src={channel.channelImage} alt='channel profile' className='shadow avatar aspect-square shrink-0 lg:h-16 sm:h-24 rounded-full  align-middle border-none' />
                </div>
                <div className='col-span-2'>
                    <h1 className="text-2xl">{channel.channelName}</h1>
                    <p>Subscriber:{channel.channelSubCount}</p>
                </div>
            </div>
            <div className=" ml-24">
                {isFollowing?<button className='bg-black rounded text-white m-2 p-2' onClick={()=>{ChangeSubscriptionStatus(channel._id)}}>Unsubscribe</button>:<button className='bg-black rounded text-white m-2 p-2' onClick={()=>{ChangeSubscriptionStatus(channel._id)}}>subscribe</button>}
                <button className='bg-black rounded text-white m-2 p-2' onClick={()=>{Notify()}}>Notify</button>
            </div>

        </div>:<></>
}
        </>
    )
}

export default ChannelHeading