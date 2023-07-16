import React, { useEffect, useState } from 'react'
import CustomerInput from '../CustomerInput'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { createconv, getchatUser, getmessage } from '../../features/chat/chatSlice'
import Conversation from '../Conversation'
import ChatBox from '../ChatBox'
import { getAuserBySearch } from '../../features/auth/authSlice'
import Avatar from '../Avatar'
const Chat = ({ socket }) => {
  const [isScreenSmall, setIsScreenSmall] = useState(false);
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)
  const [search, setSearch] = useState(null)
  const [isReady, setIsReady] = useState(false);
  const [recupereIdReceiption, setTRecupereIdReceiption] = useState(null)
  const chatstate = useSelector(state => state?.chat?.conversation)
  useEffect(() => {

    console.log(recupereIdReceiption)
    if (recupereIdReceiption) {
      setIsReady(true);
    }
  }, [recupereIdReceiption]);

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
  const userstate = useSelector(state => state?.auth?.user)
  const [userDataId, setUserDataId] = useState(null)
  const handleAddConv = () => {
    if (isReady) {
      console.log(recupereIdReceiption);
      let chatExists = false;
    
      if (chatstate?.length === 0) {
        dispatch(createconv({ senderId: userstate?._id, receiptId: recupereIdReceiption }));
      } else {
        chatstate?.forEach((chat) => {
          if (chat.members.includes(recupereIdReceiption) && chat.members.includes(userstate?._id)) {
            console.log('Le chat existe');
            chatExists = true;
          }
        });
    
        if (!chatExists) {
          dispatch(createconv({ senderId: userstate?._id, receiptId: recupereIdReceiption }));
        }
      }
    }
    //   if(isReady){
    //   console.log("ready")
    //   if(chatstate.length === 0)   dispatch(createconv({ senderId: userstate?._id, receiptId: recupereIdReceiption }));
    //    else { 

    //     chatstate && 
    //     chatstate.forEach((element) => {

    //       if(!element?.members?.includes(recupereIdReceiption)) {
    //       console.log(element)
    //        dispatch(createconv({ senderId: userstate?._id, receiptId: recupereIdReceiption }));
    //       }else {
    //         setSearch("")
    //         alert('exist')
    //         return
    //       }
    //   })
    //    }


    // }

  }
  useEffect(() => {
    console.log(userDataId)
  }, [userDataId])
  useEffect(() => {
    dispatch(getchatUser(userstate?._id))
  }, [dispatch, userstate?._id])
  const chat = useSelector(state => state?.chat?.conversation)
  const [currentChat, setCurrentChat] = useState(null)
  const handleConversationClick = (data) => {
    setCurrentChat(data);
    console.log(data)
  };
  useEffect(() => {
    console.log(sendMessage)
    if (sendMessage !== null)
      socket.emit("send-message", sendMessage)
  }, [socket, sendMessage])
  useEffect(() => {
    console.log({ "socket": socket })
    if (socket !== null) {
      socket.on("receive-message", (data) => {
        console.log(data)

        setReceiveMessage(data)
      })
    }

  }, [socket])
  useEffect(() => {
    if (search) {
      dispatch(getAuserBySearch(search))
    }
  }, [search, dispatch])
  const userSearchState = useSelector(state => state?.auth?.search)
  const [cliked, setCliked] = useState(false)

  return (
    <div className='container my-5 py-5'>
      <div className='chat-box'>

        <div className='left-bar'>
          <div className='search-conversation'>
            <div className='position-relative'>
              <CustomerInput placeholder={"search your conversation"} type='text' name={'search'} value={search} onChange={(e) => setSearch(e.target.value)} />
              <div className='position-absolute bg-warning' style={{ width: '100%' }}
                onClick={handleAddConv}
              >
                {
                  search && search.length !== 0 && userSearchState && userSearchState?.map((user, index) => {
                    return <Avatar widthAndHeight={{ width: '45px', height: '45px' }} showname={true} onClick={() => setTRecupereIdReceiption(user?._id)} styledavatar={{ borderRadius: '50%', width: '30px', height: '30px', background: 'rgb(244 67 54)', color: 'white' }} com={user ? user : ''} styled={{ fontSize: '10px', marginRight: '10px' }} key={index} />
                  })
                }

              </div>
            </div>
            {
              chat && chat?.map((data, index) => {
                let isFirstChat = index === 0;
                return (
                  <div key={index} onClick={() => handleConversationClick(data)} >
                    <Conversation cliked={cliked} setCliked={setCliked} isFirstChat={isFirstChat} chatConversation={data} setUserDataId={setUserDataId} userDataId={userDataId} userId={userstate?._id} />
                  </div>
                )
              })
            }
          </div>
        </div>



        <div className='body-conversation'>
          <div>
            <ChatBox socket={socket} chat={currentChat} setSendMessage={setSendMessage} receiveMessage={receiveMessage} userDataId={userDataId} currentUser={userstate?._id} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Chat


const AlreadyExist = ({ isReady, chatState }) => {
  if (isReady) {
    chatState && chatState?.map((chat) => {
      return console.log(chat)
    })
  }

}
