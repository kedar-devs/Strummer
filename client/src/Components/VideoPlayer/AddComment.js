import axios from 'axios'
import React,{useState} from 'react'

function AddComment(props) {
  const [addButton,setAddButton]=useState(false)
  const [comment,setComment]=useState('')
  const handleChange=(event)=>{
    setComment(event.target.value)
    setAddButton(true)
  }
  const PublishComment=()=>{
    console.log(comment)
    const data=new FormData()
    const token=localStorage.getItem('Token')
    if(!token)
    {
      alert('You are not signed in Sign in to comment')
    }
    data.append('commentorID',token)
    data.append('contentId',props.id)
    data.append('comment',comment)
    axios.post('http://localhost:5000/Content/video/Comment',data)
    .then((result)=>{
      console.log(result)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className='flex'>
        <input type='text' className='outline-none bg-transparent border-b-2 border-blue-600' placeholder='Add Comment' value={comment} onChange={(event)=>{handleChange(event)}}/>
        {addButton?<>
        <button onClick={()=>{PublishComment()}}>comment</button>
        </>:<></>}
    </div>
  )
}

export default AddComment