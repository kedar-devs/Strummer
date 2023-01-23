import axios from 'axios'
import React,{useState,useEffect} from 'react'

function Comment(props) {
  const[comments,setComment]=useState()
  const [isLoading,setLoading]=useState(true)
  useEffect(()=>{
    console.log(props)
    axios.get(`/Content/video/Comment/getComment/${props.id}`)
    .then(result=>{
      if(result.data.length>0){
        console.log(result.data)
        setComment(result.data)
        setLoading(false)
      }
    })
    .catch(err=>{
      console.log(err)
    })

  },[props])
  return (
    <div className='overflow-y-scroll h-64 scrollbar-hide mt-5'>
    {isLoading?<>No Comments Available</>:<>{comments.map((comment)=>{
      return(
       <div className='grid grid-cols-4 my-2 '>
       <div className="w-12">
               <img
                 src={comment.commentDp}
                 alt="..."
                 className="shadow rounded-full h-12 align-middle border-none"
               />
             </div>
       <div className='col-span-2'>
           {comment.comment}
       </div>
       <div>
           <button>:</button>
       </div>
   </div>
      )
    })
  }</>}
   
    </div>
  )
}

export default Comment