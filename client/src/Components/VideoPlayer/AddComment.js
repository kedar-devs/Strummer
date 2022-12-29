import axios from 'axios'
import React,{useState} from 'react'

function AddComment(id) {
  const [addButton,setAddButton]=useState(false)
  const [comment,setComment]=useState('')
  const handleChange=(event)=>{
    console.log(event.target.value)
    setComment(event.target.value)
    setAddButton(!addButton)
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
    data.append('contentId',id)
    data.append('comment',comment)
    // axios.post('http://localhost:5000/')
  }
  return (
    <div className='flex'>
        <input type='text' className='outline-none bg-transparent border-b-2 border-blue-600' placeholder='Add Comment' name='comment' value={comment} onClick={(event)=>{handleChange(event)}}/>
        {addButton?<>
        <button onClick={()=>{PublishComment()}}>comment</button>
        </>:<></>}
    </div>
  )
}

export default AddComment