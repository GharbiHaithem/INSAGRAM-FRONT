import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { getAuser } from '../../features/auth/authSlice'
import { createmessage, getchatUser, getmessage } from '../../features/chat/chatSlice'
import InputEmoji from 'react-input-emoji'
import moment from 'moment'
import { useRef } from "react";
import './style.css'
const ChatBox = ({chat,currentUser,userDataId,setSendMessage,receiveMessage}) => {
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
    const[filterData,setFilterData] = useState([])
   
    useEffect(()=>{
// alert(JSON.stringify({aaaaaaaaaaaa:chat?._id}))
console.log(userDataId)
if(userDataId){
    let filteredArray= [];
    // dispatch(getAuser(userDataId))
     filteredArray = dataUserId.filter(item => item._id === userDataId);
    setFilterData(filteredArray)
    dispatch(getchatUser(filteredArray[0]?._id))
}

    },[userDataId,dispatch,dataUserId])
const chatConv = useSelector(state=>state?.chat?.conversation)
const[chatId,setChatId] = useState(null)
useEffect(() => {
    if (chat && userDataId) {
      const filteredData = chat.members
        .filter(member => member === userDataId)
        .map(() => ({ _id: chat._id }));
      console.log(filteredData);
      if(chatConv.length === 1){
        setChatId(chatConv[0]?._id)
      }else{
        setChatId(filteredData[0]?._id);
      }
     
    }
  }, [chat, userDataId,chatConv]);
  
  useEffect(() => {
    if (chatId !== null && userDataId) {
      console.log(chatId);
      dispatch(getmessage(chatId));
    }else if(chatId === undefined){
       dispatch(getmessage(chatConv?._id))
    }
  }, [chatId, dispatch,chatConv?._id,userDataId]);
console.log(chatId)
// useEffect(() => {
//     if (chatId !== undefined) {
//       console.log(chatId);
//       dispatch(getmessage(chatId));
//     }
//   }, [chatId, dispatch]);
     const messages = useSelector(state=>state?.chat?.getedmessage)
       useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])

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
          chatId:chatId ,
      }
    
      console.log(_message)
      console.log(receiveMessage);
      dispatch(createmessage(_message))
      console.log(userDataId)
      setSendMessage({_message,receiverId:userDataId})
      setTimeout(()=>{
        dispatch(getmessage(chatId))
      },300)
    }
    useEffect(()=>{
        console.log(receiveMessage && receiveMessage.chatId)
        console.log(chatId)
        console.log(receiveMessage && receiveMessage.chatId === chatId)
        if(receiveMessage !== null){
            console.log(receiveMessage)
            dispatch(getmessage(chatId))
        }
    },[chatId,dispatch,receiveMessage])
      const scroll = useRef();
      const imageRef = useRef();
    return (
        <>
        <div className="ChatBox-container">
          {chat ? (
            <>
              {/* chat-header */}
              <div className="chat-header">
                {/* <div className="follower">
                  <div>
                    <img
                      src={
                        userData?.profilePicture
                          ? process.env.REACT_APP_PUBLIC_FOLDER +
                            userData.profilePicture
                          : process.env.REACT_APP_PUBLIC_FOLDER +
                            "defaultProfile.png"
                      }
                      alt="Profile"
                      className="followerImage"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div className="name" style={{ fontSize: "0.9rem" }}>
                      <span>
                        {userData?.firstname} {userData?.lastname}
                      </span>
                    </div>
                  </div>
                </div> */}
                <hr
                  style={{
                    width: "95%",
                    border: "0.1px solid #ececec",
                    marginTop: "20px",
                  }}
                />
              </div>
              {/* chat-body */}
              <div className="chat-body" >
                { messages && messages?.map((message) => (
                  <>
                    <div ref={scroll}
                      className={
                        message.senderId === currentUser
                          ? "message own"
                          : "message"
                      }
                    >
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
                <button className="btn btn-outline-primary " onClick = {handleSend}>Send</button>
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
