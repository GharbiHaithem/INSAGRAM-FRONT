import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findConversation, getmessage } from '../../features/chat/chatSlice'

const MessageSingleUser = ({user,x}) => {
  const chatUser = useSelector(state=>state?.chat?.conversation)
  const userstate = useSelector(state=>state?.auth?.user)
  const findconversationstate = useSelector(state=>state?.chat?.findConversation)
 const messages = useSelector(state=>state?.chat?.getedmessage)
 const[lastMsg,setLastMsg] = useState(null)
  const dispatch = useDispatch()
  useEffect(()=>{

 if(user !== undefined){
  dispatch(findConversation({firstId:user,secondId:userstate?._id}))
 if(findconversationstate){
  dispatch(getmessage(findconversationstate?._id))
 }
 }

  },[dispatch])
  const sortedMessages = Array.isArray(messages)
  ? [...messages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  : [];

    return (
        <div>
          
      <p className='fs-7' style={{fontSize:'20px !important' }}>{(sortedMessages[0]?.text)}</p>
        </div>
    )
}

export default MessageSingleUser
