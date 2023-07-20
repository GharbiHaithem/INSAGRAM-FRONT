import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { getAuser } from '../../features/auth/authSlice'
import { createmessage, findConversation, getchatUser, getmessage, hideconversation } from '../../features/chat/chatSlice'
import InputEmoji from 'react-input-emoji'
import moment from 'moment'
import { useRef } from "react";
import './style.css'
import {IoReturnDownBack} from 'react-icons/io5'
import { Link } from 'react-router-dom'
const ChatBox = ({chat,currentUser,userDataId,setSendMessage,receiveMessage,socket,isScreenSmall}) => {
    console.log(userDataId)

    const dispatch = useDispatch()
    // useEffect(()=>{
    //   console.log(chat)
    //   const userId = chat?.members?.find((id)=>id !== currentUser)
    //   console.log({wwwwwwwwwwww:userId})
    //  if(chat) dispatch(getAuser(userId))
    // },[chat,dispatch,currentUser])
    const {dataUserId} = useSelector(state=>state?.auth)
    const userId = useSelector(state=>state?.auth?.user)
    const chatConversationState = useSelector(state=>state?.auth?.chatParPerson)

    console.log(userDataId)
    const [userChat,setUserChat] = useState({})

   
   useEffect(()=>{
    console.log(userDataId)
  
      const filtered = (chatConversationState?.filter((user)=>user?._id === userDataId))
      setUserChat(filtered[0])
    
   
   
   },[chatConversationState,userDataId])
   console.log(userChat)

// useEffect(() => {
//    console.log("receipt" + userDataId)
//    if(dataUserId){
//     dispatch(getAuser(userDataId))
//    }
//   }, [userDataId,dispatch]);
// useEffect(()=>{
//  const filter =chatConv &&  chatConv?.filter((x)=>(x?.members?.includes(userId?._id))) 
//  setChatId(filter[0]?._id)

// },[chatConv,userId])
// console.log(chatId)  
  // useEffect(() => {
  //   if (chatId !== null && userDataId) {
  //     console.log(chatId);
  //     dispatch(getmessage(chatId));
  //   }else if(chatId === undefined){
  //      dispatch(getmessage(chatConv?._id))
  //   }
  // }, [chatId, dispatch,chatConv?._id,userDataId]);

// useEffect(() => {
//     if (chatId) {
//       console.log(chatId);
//       dispatch(getmessage(chatId));
//     }else if(chatId === null || undefined ){
//       console.log("pas de chat")
//     }
//   }, [chatId, dispatch]);
     const messages = useSelector(state=>state?.chat?.getedmessage)
       useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])
  const findConversations = useSelector(state=>state?.chat?.findConversation)
  useEffect(() => {
    dispatch(findConversation({ firstId: userId?._id, secondId: userDataId }));
  }, [dispatch, userId, userDataId]);
  
  // Deuxième useEffect pour dispatcher getmessage une fois findConversations est mis à jour
  useEffect(() => {
    if (findConversations && Object.keys(findConversations).length > 0) {
      dispatch(getmessage(findConversations?._id));
    }
  }, [dispatch, findConversations]);
  
     console.log(messages)
     const [newMessage, setNewMessage] = useState("");
     const handleChange = (newMessage)=> {
        setNewMessage(newMessage)
      }
     const handleSend = async(e)=> {
        e.preventDefault()
        const _message = {
          senderId : userId?._id,
          text: newMessage,
          chatId:findConversations?._id ,
      }
    
      console.log(_message)
      console.log(receiveMessage);
      dispatch(createmessage(_message))
      console.log(userDataId)
      setSendMessage({_message,receiverId:userDataId})
      setTimeout(()=>{
        dispatch(getmessage(findConversations?._id))
      },300)
    }
    console.log(userDataId)
    useEffect(() => {
      if (socket !== null) {
        socket.on("receive-message", (data) => {
          console.log("Message reçu :", data);
          // Effectuez les actions souhaitées en fonction des données reçues
          dispatch(getmessage(findConversations?._id));
        });
      }
    
      // Nettoyage de l'écoute de l'événement lorsque le composant est démonté ou lorsque socket change
      return () => {
        if (socket !== null) {
          socket.off("receive-message");
        }
      };
    }, [socket,findConversations, dispatch]);
    
      const scroll = useRef();
      const imageRef = useRef();
    return (
        <>
        <div className={`${isScreenSmall ? 'bg-transparent xxx' : 'ChatBox-container'}`}>
          {chat ? (
            <>
             
           <div className="chat-header">
             <div className='d-flex align-items-center gap-10'>
          <Link onClick={()=>dispatch(hideconversation())}>
          <span className='d-flex align-items-center justify-content-center' style={{width:'40px',height:'40px' , borderRadius:'50%' ,background:'#b4e7ea' ,border:'2px solid white',boxShadow:'0 0 10px #eee'}}> <IoReturnDownBack  color='white' className='fs-2'/></span>
          </Link>
             <Avatar showname={true} badge={false} styled={{fontSize:'12px'}} widthAndHeight={{width:'40px',height:'40px'}} com={userChat} />
             
             </div>
                <hr
                  style={{
                    width: "95%",
                    border: "0.1px solid #ececec",
                    marginTop: "20px",
                  }}
                />
              </div>
              {/* chat-body */}
              <div className={'chat-body'} >
                { messages && messages?.map((message) => (
                  <>
                    <div ref={scroll}
                      className={
                        message.senderId === currentUser
                          ? "message own"
                          : "message"
                      }
                    >
                    
                       {  message.senderId === currentUser ? <Avatar statu={true} showname={true} badge={false} styled={{fontSize:'9px'}} widthAndHeight={{width:'40px',height:'40px'}} com={userId} />
                      :  <Avatar showname={true} statu={true} badge={false} styled={{fontSize:'9px'}} widthAndHeight={{width:'40px',height:'40px'}} com={userChat} />
                      } 
                      <span>{message.text}</span>{" "}
                      <span>{moment(message.createdAt).fromNow()}</span>
                    </div>
                  </>
                ))}
              </div>
              {/* chat-sender */}
              <div className="chat-sender">
                <div onClick={() => imageRef.current.click()}>+</div>
                <InputEmoji
                  value={newMessage}
                  onChange={handleChange}
                />
                <button className="btn btn-outline-primary " onClick={handleSend}>Send</button>
                <input
                  type="file"
                  name=""
                  id=""
                  style={{ display: "none" }}
                  ref={imageRef}
                />
              </div>
            </>
          ) : (
            <span className="chatbox-empty-message">
              Tap on a chat to start conversation...
            </span>
          )}
        </div>
      </>
    )

          }
export default ChatBox
