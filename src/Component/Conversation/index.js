import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuser } from '../../features/auth/authSlice'
import Avatar from '../Avatar'

const Conversation = ({chatConversation,userId,isFirstChat,setUserDataId,userDataId,setCliked,cliked,setAddClass,onClick}) => {
    const dispatch = useDispatch()
    const[profileUser,setProfileUser] = useState(null)
  
    useEffect(()=>{
    const  user = chatConversation?.members?.find((id)=>id !== userId)
    console.log(user);
    setProfileUser(user)
    if (chatConversation !== null && profileUser === null) {
      let isDispatched = false;
  
      const checkUser = async () => {
        // Effectue une vérification supplémentaire pour éviter les dispatchs multiples
        if (!isDispatched) {
          isDispatched = true;
          await dispatch(getAuser(user));
        }
      };
  
      checkUser();
    }
    },[chatConversation, dispatch, userId, profileUser])
    const data = useSelector(state=>state?.auth?.dataUserId)
    console.log(data)
    const uniqueIds = [...new Set(data.map(x => x.id))];
    const uniqueData = data.filter(x => uniqueIds.includes(x.id));
   useEffect(()=>{
    console.log(userDataId)
    console.log(cliked) 
  },[userDataId])
   
     return (
        <div >
    
            {
           uniqueData.map(x => {
            return (
            
                isFirstChat && <Avatar
                key={x.id}
                showname={true}
                styledP={{height:"100px"}}
                cliked={cliked}
                setCliked ={setCliked}
                widthAndHeight={{width:'60px',height:'60px'}}
                onClick={()=>{
                
                  setUserDataId(x?._id)
                }}
                userDataId={userDataId}
                styled={{ fontSize: '13px' }}
                styledavatar={{ borderRadius: '50%', width: '30px', height: '30px', background: 'rgb(244 67 54)', color: 'white' }}
                com={x}
                
              />
        
              
            )
          })
       
          
          
          
          
          
          
            }
    
        </div>
    )
}

export default Conversation
