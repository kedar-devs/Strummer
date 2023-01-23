import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import axios from 'axios'
import { useSelector } from 'react-redux'
import {actionCreator} from '../../State/index'
import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
function Navbar() {
  const pages = ["Home", "Subscription", "History", "Liked Video"]
  const Profile = ["Your Channel", "Setting", "Sign Out"]
  const navigate = useNavigate()
  const selectorData = useSelector(STATE => STATE.user);
  const dispatch=useDispatch()
  const action=bindActionCreators(actionCreator,dispatch)
  const [Pp,setImg]=useState('')
  const [token, setToken] = useState(selectorData)
  const [anchorPages, setPages] = useState(null)
  const [anchorProfile, setProfile] = useState(null)
  useEffect(() => {
    const State = selectorData
    const token=localStorage.getItem('Token')
    if(token){
    setToken(token)
    axios.get(`/User/GetUserImage/${token}`)
    .then(result=>{
      setImg(result.data)
    })
    .catch(err=>{
      console.log(err)
    })
    }
    else{
    setToken(State.authToken)
  
    }
  }, [selectorData])
  const setPagesOpen = (event) => {
    setPages(event.currentTarget)
  }
  const setProfileOpen = (event) => {
    setProfile(event.currentTarget)
  }
  const setPageClose = (page) => {
    switch(page){
      case 'Home':
        navigate('/')
        break
      case 'Subscription':
        navigate('/Subscription')
        break
      case 'History':
        navigate('/History')
        break
      case 'Liked Video':
        navigate('/LikedVideo')
        break
      default:
        break
    }
    setPages(null)
  }
  const setProfileClose = (setting) => {
    console.log(setting)
    switch(setting){
      case 'Sign Out':
        console.log('In here')
        localStorage.removeItem('Token')
        action.DeleteAccessToken()
        navigate('/')
        break
      case 'Your Channel':
        navigate('/ChannelRoute')
        setProfile(null)
        break
      default:
        console.log('In here')
        setProfile(null)
    }
   
  }
    



  return (

    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <GraphicEqIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.15rem',
              color: 'White',
              textDecoration: 'underline',
            }}
          >
            Strummer
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={setPagesOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorPages}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorPages)}
              onClose={setPageClose}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}
                  onClick={setPageClose}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              {token==='None'?
              <>
              <button type="button"  onClick={()=>{navigate('/RegisterUser')}} class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mx-3">
                    Sign up
                  </button>
                  <button type="button" onClick={()=>{navigate('/login')}} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    Login
                  </button>
              </>:<></>  
            }
            </Menu>
          </Box>
          <GraphicEqIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.15rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Strummer
          </Typography>
          <Box
            sx={{ display: { xs: 'none', md: 'flex' } }}
            
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{setPageClose(page)}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            {token==='None'?
          <div className="flex md:flex md:flex-grow flex-row justify-end space-x-1 mt-3">
          <Box sx={{ flexGrow: 0 }}
          alignItems=" flex-end"
          >
            
           
              <button type="button" onClick={()=>{navigate('/RegisterUser')}}  className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mx-3">
                Sign up
              </button>
              <button type="button" onClick={()=>{navigate('/login')}} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                Login
              </button>
             
            
          </Box>
          </div>:<></>  
          }
          </Box>
          {token !== 'None' ?
          <div className="flex md:flex md:flex-grow flex-row justify-end space-x-1 mt-3">
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={setProfileOpen} sx={{ p: 0 }}>
                    {Pp!==''?<Avatar alt="Remy Sharp" src={Pp} />:<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorProfile}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorProfile)}
                onClose={setProfileClose}
              >
                {Profile.map((setting) => (
                  <MenuItem key={setting} onClick={()=>setProfileClose(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            </div> :<></>
          }
        </Toolbar>
      </Container>
    </AppBar>

  )
}

export default Navbar