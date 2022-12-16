import React,{useState} from 'react'

function AddComment() {
  const [addButton,setAddButton]=useState(false)

  return (
    <div className='flex'>
        <input type='text' className='outline-none bg-transparent border-b-2 border-blue-600' placeholder='Add Comment' onClick={()=>{setAddButton(!addButton)}}/>
        {addButton?<>
        <button>comment</button>
        </>:<></>}
    </div>
  )
}

export default AddComment