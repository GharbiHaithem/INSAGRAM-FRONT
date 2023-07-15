import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./style.css";
import { Navigation } from "swiper";
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getAllPosts, likedislikePost } from '../../features/post/postSlice'
import Comment from '../Comment';
import ListComments from '../ListComments';
import io from 'socket.io-client';
import Dropdown from 'react-bootstrap/Dropdown';
import moment from "moment"
import Avatar from '../Avatar';
import {MdDeleteForever} from 'react-icons/md'
import {MdOutlineEditNote} from 'react-icons/md'
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ item }) {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch()
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [isScreenSmall, setIsScreenSmall] = React.useState(false);

    
  React.useEffect(() => {
      const handleResize = () => {
          const isSmall = window.matchMedia("(max-width: 600px)").matches;
          setIsScreenSmall(isSmall);
      };

      // Ajoute un écouteur d'événement pour détecter les changements de taille d'écran
      window.addEventListener("resize", handleResize);

      // Vérifie la taille de l'écran au chargement initial de la page
      handleResize();
      console.log(isScreenSmall)
      // Nettoie l'écouteur d'événement lorsque le composant est démonté
      return () => {
          window.removeEventListener("resize", handleResize);
      };

  }, [isScreenSmall]);
  const userState = useSelector(state => state?.auth?.user)
  const postState = useSelector(state => state?.post?.posts)
  const [showComments, setShowComments] = React.useState(false)
  const [isLiked, setIsLiked] = React.useState(false)
  const user = useSelector(state => state?.auth?.user?.firstname)
  const liketime =  useSelector(state=>state?.post?.dislike?.datelike) 
  const [_user, setUser] = React.useState(user ? user : "")
  const [socket, setSocket] = React.useState(null)
  React.useEffect(() => {
    setSocket(io('http://localhost:5000'));
  }, [])
  const[authorized,setAuthorized] = React.useState(false)
 React.useEffect(()=>{
if(userState?._id === item?.postedBy?._id){
  setAuthorized(true)
}else{
  setAuthorized(false)
}
 },[userState?._id,item?.postedBy?._id])
  const userId = useSelector(state=>state?.auth?.user?._id)
  React.useEffect(() => {
    // console.log(userState?._id)
    const res =  (item?.likes?.map((x) => x?._id === userId)) 
      // setIsLiked(true)
console.log(res[0]);
if(res[0]=== true){
  setIsLiked(!isLiked)
}
    

    // console.log(item?.likes.toString())
    // console.log(isLiked)
  }, [item?.likes, userId])
  const nblikes = item?.likes?.length
  React.useEffect(()=>{
   if(socket !== null){
    socket.on("receive-like-dislike",(data)=>{
      console.log(data)
      dispatch(likedislikePost(data))
   
    })
   }

  },[dispatch,socket])
  return (
    
    <Card className='col-md-12 col-sm-12'  >
      
      <CardHeader
        avatar={
          <Avatar showname={true} styled={{fontSize: isScreenSmall ? "12px" : "23px" }}  widthAndHeight={{width:isScreenSmall ? "60px" : "80px",height:isScreenSmall ? "60px" : "80px"}} com={item?.postedBy} link={`/profile/${item?.postedBy?._id}`} styledavatar={{borderRadius:"50%",width:'30px',height:'30px',background:"rgb(244 67 54)",color:"white"}}/>
        }
        action={
          <IconButton aria-label="settings">

            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic">
                <MoreVertIcon />
              </Dropdown.Toggle>
              <Dropdown.Menu>
              {authorized &&  <Dropdown.Item className='p-3'  href="#/action-1" onClick={()=>{dispatch(deletePost(item?._id))
              setTimeout(()=>{
               dispatch(getAllPosts())
              },2000)
              }}><MdDeleteForever className='fs-4'/>&nbsp;&nbsp;Delete</Dropdown.Item>}
              {authorized &&  <Dropdown.Item className='p-3'  href="#/action-2"><MdOutlineEditNote className='fs-4'/>&nbsp;&nbsp;Edit</Dropdown.Item>}
                <Dropdown.Item className='p-3'  href="#/action-3"></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </IconButton>
        }
      
        subheader={postState?.createdAt}
      />

      {/* <CardMedia
        component="img"
        height="500"
        image="https://images.pexels.com/photos/7533667/pexels-photo-7533667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Paella dish"
      /> */}
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {
          item && item?.images?.map((_img, index) => {
            return (
              <SwiperSlide key={index} style={{ width: '100%', height: '800px' }}>
                <img src={_img?.url} alt={_img?.public_id} style={{ objectFit:isScreenSmall ? 'contain' : 'cover', width: '100%' }} />
              </SwiperSlide>
            )
          })
        }
        {
          (item?.videos?.map((_video, index) => {
            return (
              <SwiperSlide key={index} style={{ width: '100%', height: '300px' }}>

                <video className='video_player' controls width={'100%'} height="100%">
                  <source src={_video?.url} type="video/mp4" />
                  {/* Ajoutez d'autres sources vidéo ici pour une compatibilité multi-format */}
                  Votre navigateur ne prend pas en charge la balise vidéo.
                </video>

              </SwiperSlide>
            )
          }))
        }


      </Swiper>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item && item?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        <div className='d-flex align-items-center gap-30'>
          {isLiked ?
            <IconButton aria-label="add to favorites" onClick={() => {
              setIsLiked(!isLiked)
              const data = {
                id: item?._id,
                userId: userState?._id
              }
              dispatch(likedislikePost(data))
              setTimeout(()=>{
              dispatch(getAllPosts())
              },300)
             
              socket.emit('like-dislike',{
                id:item?._id,
                userId:userState?._id,
                receivedId:[...userState?.followers,userState?._id]
              })
              
             
            }}>
              <FavoriteIcon className='text-danger' />&nbsp;  {JSON.stringify(nblikes)}
            </IconButton> :
            <IconButton aria-label="add to favorites" onClick={() => {
              setIsLiked(!isLiked)
              const data = {
                id: item?._id,
                userId: userState?._id
              }
              dispatch(likedislikePost(data))
              setTimeout(()=>{
                dispatch(getAllPosts())
                },300)
              socket.emit("sendNotification", {
                senderName: _user,
                receivedName: item?.postedBy?.firstname,
                type: "like",
                datenotif:moment(liketime).fromNow()
              })
              socket.emit('like-dislike',{
                id:item?._id,
                userId:userState?._id,
                receivedId:[...userState?.followers,userState?._id]
              })

           
            }}>
              <FavoriteIcon />&nbsp; {JSON.stringify(nblikes)}
            </IconButton>
           
          }
       
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>


          <span className="material-symbols-outlined fs-2" onClick={() => setShowComments(!showComments)} style={{ cursor: 'pointer' }}>
            mark_unread_chat_alt
          </span>

        </div>

      </CardActions>

      <ListComments post={item} />
      {showComments && <Comment socket={socket} item={item} />}
    </Card>
  );
}