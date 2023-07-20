import React, { useEffect, useState } from 'react'
import './style.css'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import MessageSingleUser from '../MessageSingleUser'

const Avatar = ({statu,showMsg,isScreenSmall,badge,status,online,com,styled,show,children,styledavatar ,userDataId,link,onClick,styledP,xxx,widthAndHeight,showname}) => {
  const[addClass,setAddClass] = useState(false)
  const[connecte,setConnected] = useState(false)
  useEffect(()=>{
if(com?._id === userDataId){
  setAddClass(true)
}else{
  setAddClass(false)
}
  },[com,userDataId])
  console.log(addClass)
  const {id} = useParams()
  console.log(com)
  useEffect(()=>{
    console.log(com?.pic[0]?.length)
  },[com])
  useEffect(()=>{
   (online?.filter((user)=>user._id === com?._id && setConnected(true))) 
  },[online,com?._id])
    return (
        <div className={`${addClass ? "x p-4" : "list-comments-wrapper  " }`} style={styledP} onClick={onClick}>
         
        <div className={`${id && !xxx ? 'd-flex flex-column gap-20' : xxx ? "d-flex align-items-center gap-10" : "d-flex gap-10 align-items-center"} } `}  >
        {com?.pic[0]?.length === 0 ? <div className=' d-flex justify-content-center align-items-center' style={styledavatar}><span className={`${id ? 'fs-2' : 'fs-7'}`}>{com && com?.lastname[0]}</span></div> : 
        <div style={widthAndHeight } className={status} >
          <img src={com?.pic[0]?.url} alt={com?.pic[0]?.public_id} style={{objectFit:'cover', borderRadius:'50%',width:'100%' , height:'100%'}} />
      {badge &&  <>
        {connecte  ? <span className=' bg-success position-absolute'  style={{border:'2px solid white',borderRadius:'50%',bottom:isScreenSmall ? '-5px' :'-10px',right:isScreenSmall ?'7px' :'5px', width:isScreenSmall ? '14px' : '20px',height:isScreenSmall ? '14px' : "20px"}}>&nbsp;</span>:
       <span className='bg-danger position-absolute' style={{border:'2px solid white',borderRadius:'50%',bottom:isScreenSmall ? '-5px' :'-10px',right:isScreenSmall ?'7px' :'5px', width:isScreenSmall ? '14px' : '20px',height:isScreenSmall ? '14px' : "20px"}}>&nbsp;</span>
       }
      </> }
        </div>
        }
      {showname && <div className={`d-flex flex-column ${isScreenSmall ? '' : 'gap-10'}`}>
        <Link to={link}><p style={styled} className=' mb-0 fs-7'>{com?.lastname + " " + com?.firstname}</p></Link>
       {showMsg && isScreenSmall && userDataId === com?._id && <MessageSingleUser  user={userDataId} /> }
       { online ? <p className={`${statu ?'d-none' : 'mb-0 text-muted'}`} style={{fontSize:'11px'}} >Online</p> : <p className={`${statu ?'d-none' : 'mb-0 text-muted'}`}style={{fontSize:'12px'}}>HorsLine</p>}
        </div>}
      </div>
    {show &&  <div className='text-muted ' style={{width:'150px'}}><span className='mb-0' style={styled}>{moment(com?.createdAt).fromNow()}</span></div>}
     {children}
      </div>
    )
}

export default Avatar
