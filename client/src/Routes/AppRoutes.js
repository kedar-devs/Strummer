import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Home from '../Components/Home/Home'
import SearchBar from '../Components/SearchBar/SearchBar'
import LoginForm from '../Components/Forms/LoginForm'
import RegisterForm from '../Components/Forms/RegisterForm'
//Form Related data
import LoginData from '../Components/FormData/LoginUserMobile'
import LoginEmailData from '../Components/FormData/LoginUser'
import UserData from '../Components/FormData/UserProfile'
import MakeCreator from'../Components/FormData/MakeCreator'
//Validation
import UserLoginEmailValidation from '../Components/FormValidation/UserLoginValidation'
import UserLoginValidation from '../Components/FormValidation/UserLoginMobileValidation'
import UserRegisterValidationSchema from '../Components/FormValidation/UserRegisterValidation'
import UserCreatorValidationSchema from '../Components/FormValidation/UserCreatorValidation'
function AppRoutes() {
  return (
    <Router>
        <Navbar />
        <SearchBar />
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/loginMobile" element={<LoginForm LoginData={LoginData} UserLoginValidation={UserLoginValidation}/>} />
            <Route path="/login" element={<LoginForm LoginData={LoginEmailData} UserLoginValidation={UserLoginEmailValidation}/>}/>
            <Route path="/RegisterUser" element={<RegisterForm RegisterData={UserData} UserRegisterValidation={UserRegisterValidationSchema}/>}/>
            <Route path="/BecomeCreator" element={<RegisterForm RegisterData={MakeCreator} UserRegisterValidation={UserCreatorValidationSchema}/>}/>
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