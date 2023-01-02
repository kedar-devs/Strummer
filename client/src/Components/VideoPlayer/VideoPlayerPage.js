import React,{useState,useEffect} from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { AiFillHeart, AiOutlineMenu } from "react-icons/ai";
import { FaHeartBroken, FaShare } from "react-icons/fa";
import { ImDownload3 } from "react-icons/im";
import axios from "axios";

function VideoPlayerPage(props) {
  const [videoInfo,setVideoInfo]=useState({})
  const [isLoading,setLoading]=useState(true)
  const [isLiked,setisLiked]=useState(false)
  const [isDisLiked,setIsDisliked]=useState(false)

  useEffect(()=>{
    setVideoInfo(props.videoInfo)
    setLoading(false)
  },[videoInfo,props])
  
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
  return (
    <>
    {isLoading?<>Loading</>:
    <div className="h-80">
      <div className="grid grid-cols-3 gap-2 items-left">
        <div className="col-span-2 text-white justify-start ml-16">
          <h1 className="text-2xl ">{videoInfo.Title}</h1>
          <div className="grid grid-cols-4 mt-3">
            <div className="grid grid-cols-4 col-span-2">
              <div className="justify-end object-right ">
                <div className="w-2/6">
                  <img
                    src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                    alt="..."
                    className="shadow rounded-full max-w-full h-auto align-middle border-none items-end lg:ml-16"
                  />
                </div>
              </div>
              <div className="justify-items-start text-xl col-span-2">
                <h2>channel Name</h2>
                <p className="text-sm">Subscriber 0</p>
              </div>

              <div className="text-xl">
                <button className="rounded-full border bg-black px-5 py-1">
                  Follow
                </button>
              </div>
            </div>
            <div className="col-span-2 items-center text-xl">
              <button className="rounded-lg border text-sm bg-black" style={{background:isLiked?'white':'black'}}>
                <button className="ml-4  m-0 mt-0 text-red-700"  onClick={()=>{AddLike(videoInfo._id)}}>
                  <AiFillHeart size={14}/>
                  <p className="text-xs">
                  {videoInfo.LikeCount}
                  </p>
                </button>
                
                <button className="ml-3  m-0 mt-0 text-red-700 p-3 border-l-2" style={{background:isDisLiked?'white':'black'}} onClick={()=>{AddDisLike(videoInfo._id)}}>
                  <FaHeartBroken size={14}/>
                  <p className="text-xs">
                  {videoInfo.DislikeCount}
                  </p>
                </button>
              </button>
              <button className="ml-3 text-blue-600 rounded-lg border p-3 bg-black" onClick={()=>{Share()}}>
                <FaShare />
              </button>
              <button className="ml-3 text-green-600 rounded-lg border p-3 bg-black">
                <ImDownload3 />
              </button>
              <button className="ml-3 text-white rounded-lg border p-3 bg-black">
                <AiOutlineMenu />
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
