import React from 'react'
function ChannelNavbar() {
    const slideText = ['Home','Videos','Playlist','Community','About','Channels']
  return (

      <div className="flex md:overflow-x-scroll overflow-x-scroll m-5 lg:scrollbar-hide md:scrollbar-hide ">
        {slideText.map((ele)=>{
            return(
                <div className='mx-10 nav-item px-2'><h1 className="block py-2 pl-3 pr-4 text-xl text-white bg-blue-700 rounded md:bg-transparent md:text-white-700 md:p-0 dark:text-white">{ele}</h1></div>
            )
        })}
      </div>
  
  )
}

export default ChannelNavbar