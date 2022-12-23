import React from 'react'
// import ChannelHeading from './ChannelHeading'
// import ChannelNavbar from './ChannelNavbar'
import BecomeCreator from './BecomeCreator';
import { Outlet } from "react-router-dom";
function Channel() {
  return (
    <div>
      <BecomeCreator/>
      {/* <ChannelHeading />
      <ChannelNavbar /> */}
      <Outlet />
    </div>
  )
}

export default Channel