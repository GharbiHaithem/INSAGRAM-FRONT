
import React, { useEffect, useState } from 'react'

import Cards from '../Card'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../../features/post/postSlice'
import { suggestusers } from '../../features/auth/authSlice'
import Avatar from '../Avatar'
import Follow from '../FollowBtn'
import { Link, useNavigate } from 'react-router-dom'

const Home = ({socket}) => {
  const suggestUser = useSelector(state => state?.auth?.suggestuser)
 const userstate = useSelector(state=>state?.auth?.user)
 const auth = useSelector(state=>state?.auth?.isLogin)
 console.log(userstate);
  const [isScreenSmall, setIsScreenSmall] = useState(false);
  useEffect(() => {
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
  const dispatch = useDispatch()
  useEffect(() => {
 
   if(userstate !== null && auth === true){
    dispatch(suggestusers())
   }
      
    
    
  }, [dispatch,userstate,auth])
  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])
  const car = useSelector(state => state?.post?.posts)
  const navigate = useNavigate()
  console.log(userstate)
  return (
    <div className='container'>
      <div className='row'>
       
            <div className={`${isScreenSmall ? 'col-md-12' : 'col-md-9' }  my-5 py-5`}>
            {
          car && car?.map((item, index) => {
            
            return (
                <Cards socket={socket} item={item} key={index} />
            )
          })
        }
           </div>
        <div className={`${isScreenSmall ? 'd-none' : 'col-md-3 my-5  py-5' }`}>
          {
          suggestUser  && suggestUser?.map((user, index) => {
            return <div  key={index} >
            
              <>
              <Avatar link={`/profile/${user?._id}`} widthAndHeight={{width:'80px' ,height:'80px'}}   styledavatar={{ borderRadius: '50%', width: '30px', height: '30px', background: 'rgb(244 67 54)', color: 'white' }}  com={user} styled={{fontSize:'10px',marginRight:'10px'}}>
               <Follow user={user}/>
                </Avatar>
              </>
           

            </div>
            })
          }

        </div>
      </div>
    </div>
  )
}

export default Home
