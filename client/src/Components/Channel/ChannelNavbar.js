import React from 'react'
import { useNavigate } from 'react-router-dom'
function ChannelNavbar() {
    const slideText = ['Videos','About','Channels']
    const navigate=useNavigate()
    let pathname=window.location.pathname

    const Count=()=>{
      let cnt=0
      for(const c of pathname){

          if(c==='/'){
            cnt+=1
          }
      }
      console.log(cnt)
      if(cnt>2){
        return true
      }
      else{
        return false
      }
    }

    const GotoOutlet=(target)=>{
      console.log(target,pathname,Count())
      if(Count()){
        console.log('in here')
        pathname=pathname.substring(0,pathname.lastIndexOf('/'))
      }
      switch(target){
        case 'Videos':
          navigate(`${pathname}`)
          break
        case 'Playlist':
          navigate(`${pathname}/Playlist`)
          break
        case 'About':
          navigate(`${pathname}/About`)
          break
        case 'Channels':
          navigate(`${pathname}/Channels`)
          break
        default:
          navigate('/')
      }
    }
  return (

      <div className="flex md:overflow-x-scroll overflow-x-scroll m-5 lg:scrollbar-hide md:scrollbar-hide ">
        {slideText.map((ele)=>{
            return(
                <div className='mx-10 nav-item px-2'><h1 className="block py-2 pl-3 pr-4 text-xl text-white bg-blue-700 rounded md:bg-transparent md:text-white-700 md:p-0 dark:text-white" onClick={()=>{GotoOutlet(ele)}}>{ele}</h1></div>
            )
        })}
      </div>
  
  )
}

export default ChannelNavbar