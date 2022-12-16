import React,{useState} from 'react'

function Comment() {
  const[comments,setComment]=useState(['Comment1 svfdfbdbgfgfgfhnfhnmm','Comment2','Comment1','Comment2','Comment1','Comment2','Comment1','Comment2','Comment1','Comment2',])
  return (
    <div className='overflow-y-scroll h-64 scrollbar-hide'>
    {comments.map((comment)=>{
      return(
       <div className='grid grid-cols-4 my-2 '>
       <div className="w-2/6">
               <img
                 src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                 alt="..."
                 className="shadow rounded-full max-w-full h-auto align-middle border-none"
               />
             </div>
       <div className='col-span-2'>
           {comment}
       </div>
       <div>
           <button>:</button>
       </div>
   </div>
      )
    })
  }
   
    </div>
  )
}

export default Comment