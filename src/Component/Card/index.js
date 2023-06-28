import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
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
import { dislikepost, likePost } from '../../features/post/postSlice'
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
  const userState = useSelector(state => state?.auth?.user)
  const postState = useSelector(state => state?.post?.posts)

  const [isLiked, setIsLiked] = React.useState(false)
  React.useEffect(()=>{
    // console.log(userState?._id)
      if(item?.likes.find((x)=>x === userState?._id)){
        setIsLiked(true)
      }

      // console.log(item?.likes.toString())
      // console.log(isLiked)
      },[item?.likes,userState?._id])
  return (
    <Card sx={{ maxWidth: '70%' }} className='mx-auto'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userState?.lastname[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={userState?.firstname + " " + userState?.lastname}
        subheader={postState?.createdAt}
      />
      {/* <CardMedia
        component="img"
        height="500"
        image="https://images.pexels.com/photos/7533667/pexels-photo-7533667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Paella dish"
      /> */}
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>{
          item && item?.images?.map((_img, index) => {
            return (<div key={index} style={{ width: '100%', height: '500px' }}>
              <img src={_img?.url} alt={_img?.public_id} style={{ objectFit: 'cover', width: '100%' }} />
            </div>)
          })
        }
        {
          JSON.stringify(isLiked)
        }
        </SwiperSlide>

      </Swiper>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item && item?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {isLiked ?
          <IconButton aria-label="add to favorites" onClick={() => {
            setIsLiked(!isLiked)
            dispatch(dislikepost(item?._id))}}>
            <FavoriteIcon className='text-danger' />
          </IconButton> :
          <IconButton aria-label="add to favorites" onClick={() => {
               setIsLiked(!isLiked)
               dispatch(likePost(item?._id))
          }}>
            <FavoriteIcon />
          </IconButton>
        }
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}