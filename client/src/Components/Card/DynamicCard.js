import React,{useEffect,useState} from 'react'
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
import {BsHeartFill} from 'react-icons/bs'
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';

import MoreVertIcon from '@mui/icons-material/MoreVert';
function DynamicCard(props) {
  const [isLiked,setisLiked]=useState(false)
  const [UsersId,setUsersId]=useState('')
  const navigate=useNavigate()
  useEffect(()=>{
    let Token=localStorage.getItem('Token')
    if(Token){
      axios.get(`/User/GetUserId/${Token}`)
      .then(result=>{
        console.log(result.data)
        const userId=result.data
        setUsersId(result.data)
        const contentId=props.cardDetail._id
        axios.put('/Content/Likes/checkLikes',{userId,contentId})
        .then(result=>{
          setisLiked(true)
        })
        .catch(err=>{
          console.log(err)
        })
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },[props])
  const AddHistory=(id)=>{
    
    let Token=localStorage.getItem('Token')
    if(Token){
      axios.get(`/User/GetUserId/${Token}`)
      .then(result=>{
        console.log(result.data)
        const userId=result.data
        const contentId=id
        axios.post('/Content/Video/AddHistory',{userId,contentId})
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
    navigate(`/VideoPlayer/${id}`)
  }
 
  
  const AddLike=(id)=>{
    if(!isLiked){
    axios.get(`/Content/AddLike/${id}`)
    .then(result=>{
      console.log(result)
    })
    .catch(err=>{
      console.log(err)
    })
    const body={
      ContentId:id,
      userId:UsersId
    }
    axios.post('/Content/Likes/AddLikes',body)
    .then(result=>{
      console.log(result.data)
    })
    .catch(err=>{
      console.log(err)
    })
    setisLiked(!isLiked)
 
  }
  else{
    console.log('From Likes Else')
    axios.get(`/Content/RemoveLike/${id}`)
    .then(result=>{
      console.log('Successful like removal')
    })
    .catch(err=>{
      console.log(err)
    })
    const body={
      ContentId:id,
      userId:UsersId
    }
    axios.delete('/Content/Likes/DeleteLikes',{data:body})
    .then(result=>{
      console.log(result.data)
    })
    .catch(err=>{
      console.log(err)
    })
    setisLiked(!isLiked)
   
  }
  }

  const ShareVideo=(id)=>{
   const url=`https://drab-red-bandicoot-vest.cyclic.app/VideoPlayer/${id}`
   navigator.clipboard.writeText(url)
   alert('URL has been Copied and ready to be shared')
  }
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // }
  return (
    <div className='max-w-sm rounded-lg overflow-hidden shadow-md shadow-blue-300' >
      <Card className='h-96' >
       <CardMedia
        component="img"
        className='rounded-t-lg h-60'
        height="194"
        image={props.cardDetail.ImageThumbnail}
        alt="Paella dish"
        onClick={()=>{AddHistory(props.cardDetail._id)}}
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
        onClick={()=>{AddHistory(props.cardDetail._id)}}
      />
       <CardActions disableSpacing>
        {isLiked?<IconButton aria-label="add to favorites" className='bg-red-700' onClick={()=>{AddLike(props.cardDetail._id)}}>
          <BsHeartFill color='red' />
        </IconButton>:
        <IconButton aria-label="add to favorites" onClick={()=>{AddLike(props.cardDetail._id)}}>
          <BsHeartFill />
        </IconButton>
}
        <IconButton aria-label="share" onClick={()=>{ShareVideo(props.cardDetail._id)}}>
          <ShareIcon />
        </IconButton>
        
      </CardActions> 
      </Card>   
    </div>
  )
}

export default DynamicCard