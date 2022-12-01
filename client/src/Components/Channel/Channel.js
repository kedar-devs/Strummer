import React from 'react'
import ChannelHeading from './ChannelHeading'
import ChannelNavbar from './ChannelNavbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function Channel() {
  return (
    <div>
      <ChannelHeading />
      <ChannelNavbar />
      <Router>
        <Routes>
          {/*
            
          */}
        </Routes>
      </Router>
    </div>
  )
}

export default Channel