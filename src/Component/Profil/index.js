import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import { getAuser } from '../../features/auth/authSlice'
import{TiBackspaceOutline} from  'react-icons/ti' 
import './style.css'
import Avatar from '../Avatar'
import img from '../../assets/rm222-mind-39.jpg'
import Avatar2 from '../Avatar2'
import DefaultModal from '../DefaultModal'
import Warnning from '../Warnning'
import Follow from '../FollowBtn'
const Profil = () => {
    const {id} = useParams()
    const[showModal,setShowModal] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{
  if(id){
    dispatch(getAuser(id))
  }
    },[dispatch , id])
    const openModal = ()=>{
      setShowModal(true)
    }
    const closeModal = () =>{
      setShowModal(false)
    }
    const navigate = useNavigate()
    const dataUser = useSelector(state=>state?.auth?.chatParPerson)
    const[userProfile,setUserProfile] = useState(null)
    useEffect(()=>{
   dataUser && dataUser?.forEach((element,index) =>{
      if(element?._id === id){
        setUserProfile(dataUser[index])
      }
     
     })
  
    },[dataUser,id])
    const userstate = useSelector(state=>state?.auth?.user)
    const poststate = useSelector(state=>state?.post?.posts)
    const [postUpload,setPostUpload] = useState([])
    let posts = []
    useEffect(()=>{
      console.log(userProfile)
      poststate?.filter((x)=>{
      if(x?.postedBy?._id  === userProfile?._id ){
        posts.push(x)
      }
      })
      
      setPostUpload(posts?.length)
    },[poststate,userProfile?._id])
const[followingState, setFollowingState] = useState(false)
const[followersState, setFollowersState] = useState(false)

 const[followersUser,setFollowersUser] = useState([])
 const[followingUser,setFollowingUser] = useState([])
    useEffect(()=>{
    dataUser && dataUser?.map((item)=>setFollowingUser(item?.following))
    dataUser && dataUser?.map((item)=>setFollowersUser(item?.followers))

    },[dataUser])
    console.log(followersUser)
    console.log(followingUser)
    const[showForm,setShowForm] = useState(false)
    useEffect(()=>{
      if(userstate?._id === userProfile?._id){
        setShowForm(true)
      }else{
        setShowForm(false)
      }
    },[userstate?._id,userProfile?._id])
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-2'>
                    <div className='user-profile my-5 py-5 d-flex align-items-center  justify-content-between'>
                      <span>  {userProfile?.firstname + " " + userProfile?.lastname}</span>
                      <TiBackspaceOutline onClick={()=>navigate('/')} className='fs-4'/>
                    </div>
                </div>
                <div className='col-md-8'> 
                  <div className='my-5 py-5'>
                    <div className='couverture-profile'>
                       <img src={img} alt='' style={{objectFit:"cover"}}  />
                    </div>
                   
                      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',transform:"translateY(-40px)"}}>
                      <Avatar2 showForm={showForm} className={'cercles'} styledavatar={{ borderRadius: '50%', width: '80px', height: '80px', background: 'rgb(244 67 54)', color: 'white' }}  user={userProfile} styled={{fontSize:'20px'}}  />
                     {JSON.stringify(userProfile?._id)}
                      <Follow  user={userProfile} />
                      </div>
                   <div className='bord'>
<div style={{borderRight:'2px solid #eee'}} className='text-center d-flex align-items-center justify-content-center' 
 onClick={()=>{
  setFollowingState(true)
  setShowModal(true)}}><b>{userProfile?.following?.length}</b>&nbsp; Followings</div>
<div style={{borderRight:'2px solid #eee'}} className='text-center d-flex align-items-center justify-content-center'
onClick={()=>{
  setFollowersState(true)
  setShowModal(true)}}
><b>{userProfile?.followers?.length}</b>&nbsp; Followers</div>
<div className='text-center d-flex align-items-center justify-content-center'><b>{postUpload}</b>&nbsp; Posts</div>
                   </div>
                  </div>
                </div>
                <div className='col-md-2'>
                  <div className='my-5 py-5'>right bar</div>
                </div>
            </div>
     
            <div className='details-user'>
                {/* */}
            </div>
            {showModal && followingState && <DefaultModal followingState={followingState} setFollowingState={setFollowingState}  closeModal={closeModal} openModal={openModal}  > 
         {console.log(followingUser)}
           {
            
            followingUser.length !== 0 ? followingUser?.map((user1,index)=>{
              return(
<div className='d-flex justify-content-between align-items-center'>
<Avatar showname={true} widthAndHeight={{width:"60px",height:'60px'}} xxx styledP={{padding:'10px'}}  styledavatar={{ borderRadius: '50%', width: '40px', height: '40px', background: 'rgb(244 67 54)', color: 'white' }}  com={user1} styled={{fontSize:'20px'}} />

{userstate?._id !== user1?._id  &&<Follow user={user1} />}
</div>
              )
            }) : <Warnning  title={'following'} />
           }
              </DefaultModal>}

              {showModal && followersState && <DefaultModal followersState={followersState} setFollowersState={setFollowersState} closeModal={closeModal} openModal={openModal}  > 
           {
            followersUser.length !==0 ? followersUser?.map((user2,index)=>{
              return(
                <div className='d-flex justify-content-between align-items-center'>
<Avatar showname={true} xxx widthAndHeight={{width:"60px",height:'60px'}}  styledavatar={{ borderRadius: '50%', width: '40px', height: '40px', background: 'rgb(244 67 54)', color: 'white' }}  com={user2} styled={{fontSize:'20px'}} />
           {userstate?._id !== user2?._id  && <Follow user={user2} /> }
             </div>
             )
            
            }) : <Warnning  title={'followers'}/>
           }
              </DefaultModal>}
        </div>
    )
}

export default Profil
