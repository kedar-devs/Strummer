import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Home from '../Components/Home/Home'
import SearchBar from '../Components/SearchBar/SearchBar'
import LoginForm from '../Components/Forms/LoginForm'

function AppRoutes() {
  return (
    <Router>
        <Navbar />
        <SearchBar />
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<LoginForm/>} />
           {/*  <Route path="/subscription" component={}/>
            <Route path="/watchLater" component={} />
            <Route path="/History" component={}/>
            <Route path="/LikedVideo"component={} />
            <Route path="/Profile/Setting" component={}/>
            <Route path="/Profile/YourVideo" component={}/> */}

        </Routes>
    </Router>
  )
}

export default AppRoutes