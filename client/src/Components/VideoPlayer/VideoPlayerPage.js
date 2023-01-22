import React,{useState,useEffect} from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { AiFillHeart } from "react-icons/ai";
import { FaHeartBroken, FaShare } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import {useNavigate} from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import { Bars } from 'react-loader-spinner'

function VideoPlayerPage(props) {
  const navigation=useNavigate()
  const [videoInfo,setVideoInfo]=useState({})
  const [channelInfo,setChannelInfo]=useState({})
  const [isLoading,setLoading]=useState(true)
  const [isLiked,setisLiked]=useState(false)
  const [isDisLiked,setIsDisliked]=useState(false)
  const [isFollowing,setFollowing]=useState(false)
  const [UsersId,setUserId]=useState('')
  const [imgSrc,setImgSrc]=useState('https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg')
  const prod={
    name:'creator',
    email:'kedard249.kd@gmail.com',
    price:100
}
  useEffect(()=>{
    setVideoInfo(props.videoInfo)
    setChannelInfo(props.channelInfo)
    console.log(props.channelInfo)
    if(props.channelInfo.channelImage){
      setImgSrc(props.channelInfo.channelImage)
    }
    let Token=localStorage.getItem('Token')
      if(Token){
        axios.get(`http://localhost:5000/User/GetUserId/${Token}`)
        .then(user=>{
          console.log(user.data)
          const userId=user.data
          setUserId(userId)
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
    setLoading(false)
  },[videoInfo,props])

  const makePayment=(token)=>{
    const body={
        token,
        prod
    }
    axios.post('http://localhost:5000/User/payment',body)
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}
  const FollowChannel=(id)=>{
    if(!isFollowing){
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
  else{
    const Token=localStorage.getItem('Token')
    if(Token){
      axios.get(`http://localhost:5000/User/GetUserId/${Token}`)
      .then(result=>{
        console.log(result.data)
        const userId=result.data
    
        axios.delete(`http://localhost:5000/Channel/RemoveSubscription`,{data:{userId,id}})
        .then(result=>{
          console.log(result.data)

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
  }
  
  const AddLike=(id)=>{
    if(!isLiked){
    axios.get(`http://localhost:5000/Content/AddLike/${id}`)
    .then(result=>{
      let newVideoInfo=videoInfo
      newVideoInfo.LikeCount=result.data.newLikeCount
      setVideoInfo({...videoInfo,LikeCount:result.data.newLikeCount})
    })
    .catch(err=>{
      console.log(err)
    })
    const body={
      ContentId:id,
      userId:UsersId
    }
    axios.post('http://localhost:5000/Content/Likes/AddLikes',body)
    .then(result=>{
      console.log(result.data)
    })
    .catch(err=>{
      console.log(err)
    })
    setisLiked(!isLiked)
 
  }
  else{
    console.log('From Likes Else')
    axios.get(`http://localhost:5000/Content/RemoveLike/${id}`)
    .then(result=>{
      let newVideoInfo=videoInfo
      newVideoInfo.LikeCount=result.data.newLikeCount
      setVideoInfo({...videoInfo,LikeCount:result.data.newLikeCount})
    })
    .catch(err=>{
      console.log(err)
    })
    const body={
      ContentId:id,
      userId:UsersId
    }
    axios.delete('http://localhost:5000/Content/Likes/DeleteLikes',{data:body})
    .then(result=>{
      console.log(result.data)
    })
    .catch(err=>{
      console.log(err)
    })
    setisLiked(!isLiked)
   
  }
  }

  
  const AddDisLike=(id)=>{
    if(!isDisLiked){
    axios.get(`http://localhost:5000/Content/AddDislikes/${id}`)
    .then(result=>{
    
      let newVideoInfo=videoInfo
      newVideoInfo.DislikeCount=result.data.newDisLikeCount
      setVideoInfo({...videoInfo,DislikeCount:result.data.newDisLikeCount})
      console.log(videoInfo)
    })
    .catch(err=>{
      console.log(err)
    })

    setIsDisliked(!isDisLiked)
  
  }
  else{


    axios.get(`http://localhost:5000/Content/RemoveDisLike/${id}`)
    .then(result=>{

      let newVideoInfo=videoInfo
      newVideoInfo.DislikeCount=result.data.newDisLikeCount
      setVideoInfo({...videoInfo,DislikeCount:result.data.newDisLikeCount})
    })
    .catch(err=>{
      console.log(err)
    })

    setIsDisliked(!isDisLiked)
   

  }
  }
  const Share=()=>{
    const url=window.location.href
    navigator.clipboard.writeText(url)
    alert('URL has been Copied and ready to be shared')
  }
  const GoToChannel=(id)=>{
    navigation(`/PublicChannel/${id}`)
  }
  return (
    <>
    {isLoading?<div className='flex h-screen w-screen justify-center items-center'><Bars
  height="180"
  width="180"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={isLoading}
/></div>:
    <div className="h-80">
      <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:flex-col gap-2 items-left">
        <div className="col-span-2 text-white justify-start ml-16">
          <h1 className="text-2xl ">{videoInfo.Title}</h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-3">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 col-span-2">
              <div className="justify-end object-right ">
                <div className="w-2/6" onClick={()=>{GoToChannel(channelInfo._id)}} >
                  <img
                    src={imgSrc}
                    alt="..."
                    className="shadow rounded-full max-w-full h-auto align-middle border-none items-end lg:ml-16"
                  />
                </div>
              </div>
              <div className="justify-items-start text-xl col-span-2" onClick={()=>{GoToChannel(channelInfo._id)}}>
                <h2>{channelInfo.channelName}</h2>
                <p className="text-sm">Subscriber {channelInfo.channelSubCount}</p>
              </div>

              <div className="text-xl">
                <button className="rounded-full border bg-black px-5 py-1 sm:pt-1 sm:pb-4 " onClick={()=>{FollowChannel(channelInfo._id)}}>
                  {isFollowing?<p className="text-base">Following</p>:<>Follow</>}
                </button>
              </div>
            </div>
            <div className="col-span-2 items-center text-xl">
              <button className="rounded-lg border text-sm bg-black" style={{background:isLiked?'white':'black'}}>
                <button className="ml-2 m-0 mt-0 flex-none inline-block p-1  text-red-700"  onClick={()=>{AddLike(videoInfo._id)}}>
                  <AiFillHeart size={18} />
                  <p className="text-xs">
                  {videoInfo.LikeCount}
                  </p>
                </button>
                
                <button className="ml-3 m-0 mt-0 flex-none inline-block p-1 pr-3 text-red-700  border-l-2" style={{background:isDisLiked?'white':'black'}} onClick={()=>{AddDisLike(videoInfo._id)}}>
                  <FaHeartBroken size={18}/>
                  <p className="text-xs">
                  {videoInfo.DislikeCount}
                  </p>
                </button>
              </button>
              <button className="ml-3 text-blue-600 rounded-lg border p-3 bg-black" onClick={()=>{Share()}}>
                <FaShare />
              </button>
              <button className="ml-3 text-green-600 rounded-lg border p-3 bg-black">
              <StripeCheckout
                stripeKey="pk_test_51MOxzRSHgs3sudxeetSkWvkv7n6rPjksnAej8B4liQdNstnZWEpJ623mm3qYPcWMKUv8yR4rbf3xWYWgMz4NSWUo00GOD205wX"
                token={makePayment}
                name='Reward Creator'
                amount={100}
                key={videoInfo._id} 
                >
                  <BiDollar />
                  </StripeCheckout>
              </button>
            </div>
          </div>
          
          {videoInfo.viewCount}
          <br/>
          {videoInfo.Description}
        </div>
        <div className="text-white mt-10">
          {" "}
          <AddComment id={videoInfo._id}/>
          <Comment id={videoInfo._id}/>
        </div>
      </div>
    </div>
}
    </>
  );
}

export default VideoPlayerPage;
