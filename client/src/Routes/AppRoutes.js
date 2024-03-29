import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Home from '../Components/Home/Home'
import SearchBar from '../Components/SearchBar/SearchBar'
import SeachPage from '../Components/SearchBar/SeachPage'
import LoginForm from '../Components/Forms/LoginForm'
import RegisterForm from '../Components/Forms/RegisterForm'
import VideoPlayer from '../Components/VideoPlayer/VideoPlayer'
import VideoPage from '../Components/Channel/Pages/VideoPage'
import PlayListPage from '../Components/Channel/Pages/PlaylistPage'
import CommunityPage from '../Components/Channel/Pages/CommunityPage'
import ChannelPage from '../Components/Channel/Pages/ChannelPage'
import AboutPage from '../Components/Channel/Pages/AboutPage'
import Subscription from '../Components/Sbscription/Subscription'
import Channel from '../Components/Channel/Channel'
import ContentForm from '../Components/Forms/ContentForm'
import ShowChannels from '../Components/Channel/ShowChannels'
import YourChannel from '../Components/Channel/YourChannel'
import History from '../Components/History/History'
import PublicChannel from '../Components/PublicChannel/PublicChannel'
import StripePaymentPage from '../Components/Stripe/StripePaymentPage'
import LikedVideo from '../Components/LikedVideo/LikedVideo'
// import OtherVideosPage from '../Components/VideoPlayer/OtherVideosPage'
//Form Related data
import LoginData from '../Components/FormData/LoginUserMobile'
import LoginCreator from '../Components/FormData/LoginCreator'
import LoginEmailData from '../Components/FormData/LoginUser'
import RegisterMobile from '../Components/FormData/RegisterMobile'
import UserData from '../Components/FormData/UserProfile'
import MakeCreator from '../Components/FormData/MakeCreator'
import MakeChannel from '../Components/FormData/MakeChannel'
import ContentCreation from '../Components/FormData/ContentCreation'
import GenerateResetLink from '../Components/FormData/GenerateResetLink'
import ResetPassword  from '../Components/FormData/ResetPassword'
//Validation
import UserLoginEmailValidation from '../Components/FormValidation/UserLoginValidation'
import UserLoginValidation from '../Components/FormValidation/UserLoginMobileValidation'
import UserRegisterValidationSchema from '../Components/FormValidation/UserRegisterValidation'
import UserCreatorValidationSchema from '../Components/FormValidation/UserCreatorValidation'
import UserMobileNoValidation from '../Components/FormValidation/UserMobileNoValidation'
import UserChannelValidation from '../Components/FormValidation/UserChannelValidation'



function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginMobile" element={<LoginForm LoginData={LoginData} UserLoginValidation={UserLoginValidation} />} />
        <Route path="/login" element={<LoginForm LoginData={LoginEmailData} UserLoginValidation={UserLoginEmailValidation} />} />
        <Route path='/loginCreator' element={<LoginForm LoginData={LoginCreator} UserLoginValidation={UserLoginEmailValidation} />} />
        <Route path='/ResetPassword' element={<LoginForm LoginData={GenerateResetLink} UserLoginValidation={UserLoginEmailValidation} />} />
        <Route path ='/GenerateResetPassword/:token' element={<LoginForm LoginData={ResetPassword} UserLoginValidation={UserLoginEmailValidation} />} />
        <Route path='/RegisterMobile' element={<LoginForm LoginData={RegisterMobile} UserLoginValidation={UserMobileNoValidation} />} />
        <Route path="/RegisterUser" element={<RegisterForm RegisterData={UserData} UserRegisterValidation={UserRegisterValidationSchema} />} />
        <Route path="/BecomeCreator" element={<RegisterForm RegisterData={MakeCreator} UserRegisterValidation={UserCreatorValidationSchema} />} />
        <Route path="/CreateChannel" element={<RegisterForm RegisterData={MakeChannel} UserRegisterValidation={UserChannelValidation} />} />
        <Route path='/History' element={<History />} />
        <Route path="/VideoPlayer/:id" element={<VideoPlayer />} >
        <Route path="" element={<VideoPage />} />
          <Route path="Playlist" element={<PlayListPage />} />
          <Route path="Channels" element={<ChannelPage />} />
          <Route path="About" element={<AboutPage />} />
        </Route>
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/Channel" element={<Channel />} />
        <Route path="/YourChannel/:id" element={<YourChannel />} >
          <Route path="" element={<VideoPage />} />
          <Route path="Playlist" element={<PlayListPage />} />
          <Route path="Community" element={<CommunityPage />} />
          <Route path="Channels" element={<ChannelPage />} />
          <Route path="About" element={<AboutPage />} />
        </Route>
        <Route path="/PublicChannel/:id" element={<PublicChannel />} >
          <Route path="" element={<VideoPage />} />
          <Route path="Playlist" element={<PlayListPage />} />
          <Route path="Community" element={<CommunityPage />} />
          <Route path="Channels" element={<ChannelPage />} />
          <Route path="About" element={<AboutPage />} />
        </Route>
        <Route path='/payment' element={<StripePaymentPage />} />
        <Route path='/AddContent' element={<ContentForm formData={ContentCreation} />} />
        <Route path='/ShowChannel' element={<ShowChannels />} />
        <Route path='/SearchPage/:key' element={<SeachPage />} />
        <Route path='/LikedVideo' element={<LikedVideo />} />
        {/*<Route path="/watchLater" component={} />
            <Route path="/History" component={}/>
            <Route path="/LikedVideo"component={} />
            <Route path="/Profile/Setting" component={}/>
            <Route path="/Profile/YourVideo" component={}/> */}

      </Routes>
    </Router>
  )
}

export default AppRoutes