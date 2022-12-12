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

import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import MoreVertIcon from '@mui/icons-material/MoreVert';
function DynamicCard(props) {
  const navigator=useNavigate()
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // }
  return (
    <div className='max-w-sm rounded-lg overflow-hidden shadow-md shadow-blue-300' >
      <Card className='h-96' onClick={()=>{navigator(`/VideoPlayer/${props.cardDetail._id}`)}}>
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
        subheader={props.cardDetail.Description}
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