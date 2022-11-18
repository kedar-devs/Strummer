import React,{useState} from 'react'
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
function Navbar() {
    const pages=["Home","Subscription","History","Watch Later","Liked Video"]
    const Profile=["Your Channel","Setting","Sign Out"]
    const [anchorPages,setPages]=useState(null)
    const [anchorProfile,setProfile]=useState(null)
    const setPagesOpen=(event)=>{
      setPages(event.currentTarget)
    }
    const setProfileOpen=(event)=>{
      setProfile(event.currentTarget)
    }
    const setPageClose=(event)=>{
      setPages(null)
    }
    const setProfileClose=(event)=>{
      setProfile(null)
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
          sx={{  display: { xs: 'none', md: 'flex', } }}
          justifyContent="right"
          alignItems="right"
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={setPageClose}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={setProfileOpen} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting} onClick={setProfileClose}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
                </Toolbar>
             </Container>
        </AppBar>
    
  )
}

export default Navbar