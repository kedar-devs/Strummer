import React from 'react'
import {useNavigate} from 'react-router-dom'
// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import axios from 'axios'
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import MoreVertIcon from '@mui/icons-material/MoreVert';
function DynamicCard(props) {
  const navigator=useNavigate()
  const AddHistory=(id)=>{
    
    let Token=localStorage.getItem('Token')
    console.log('from history',id,Token)
    if(Token){
      axios.get(`http://localhost:5000/User/GetUserId/${Token}`)
      .then(result=>{
        console.log(result.data)
        const userId=result.data
        const contentId=id
        axios.post('http://localhost:5000/Content/Video/AddHistory',{userId,contentId})
        .then(result=>{
          console.log(result.data)
        })
        .catch(err=>{
          console.log(err)
        })
      })
      .catch(err=>{
        console.log(err)
      })
    }
    navigator(`/VideoPlayer/${id}`)
  }
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // }
  return (
    <div className='max-w-sm rounded-lg overflow-hidden shadow-md shadow-blue-300' >
      <Card className='h-96' onClick={()=>{AddHistory(props.cardDetail._id)}}>
       <CardMedia
        component="img"
        className='rounded-t-lg h-60'
        height="194"
        image={props.cardDetail.ImageThumbnail}
        alt="Paella dish"
      />
       <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.cardDetail.Title}
        subheader={props.cardDetail.Description.slice(0,50)+'....'}
      />
       <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
      </CardActions> 
      </Card>   
    </div>
  )
}

export default DynamicCard