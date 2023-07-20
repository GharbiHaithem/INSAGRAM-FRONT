import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuser } from '../../features/auth/authSlice'
import Avatar from '../Avatar'

const Conversation = ({children,online,chatConversation,userId,isFirstChat,setUserDataId,userDataId,setCliked,cliked,setAddClass,onClick,isScreenSmall}) => {
    const dispatch = useDispatch()
  
    const[allConversation,setAllConversation] =useState([])
    const[profileUser,setProfileUser] = useState(null)
  console.log(userId)
    useEffect(()=>{
      console.log(chatConversation);
      console.log(online)
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
    function removeDuplicateObjects(arr) {
      const uniqueObjectsById = {};
      const uniqueArray = [];
    
      arr.forEach(item => {
        if (!uniqueObjectsById[item._id]) {
          uniqueObjectsById[item._id] = true;
          uniqueArray.push(item);
        }
      });
    
      return uniqueArray;
    }
    const conversations = useSelector(state=>state?.chat?.conversation)
     const data = useSelector(state=>state?.auth?.chatParPerson)
    // console.log(data)
    // const uniqueIds =data && [...new Set(data.map(x => x?._id))];
    // const uniqueData =data && data?.filter(x => uniqueIds.includes(x?._id));
   useEffect(()=>{
    
   const filtreData = conversations?.filter((conv)=>conv?.members.includes(userId))
   console.log(filtreData)
  const y = filtreData?.map((x)=>(x?.members.filter(i=> i !== userId) ))
console.log(y);
let mergedArray = [];

for (const array of y) {
  mergedArray = [...mergedArray, ...array];
}
const uniqueArray = Array.from(new Set(mergedArray));

console.log(uniqueArray);
for(let i = 0 ; i<uniqueArray.length ;i++){
  dispatch(getAuser(uniqueArray[i]))
}
  },[conversations,userId,dispatch])
//  useEffect(()=>{
//   const xx =data?.filter((chat)=>chat !== null)
//   console.log(xx)
//   const cleanedPayload = removeDuplicateObjects(xx);
//   console.log(cleanedPayload);
//   setAllConversation(cleanedPayload)
//  },[data])
     return (
        <div >
    
            {
           data?.map(x => {
            return (
            
            
                isFirstChat && <Avatar
                isScreenSmall={isScreenSmall}
                key={x._id}
                showname={true}
                styledP={{height:"100px"}}
                cliked={cliked}
                setCliked ={setCliked}
                textstatus={false}
                showMsg={true}
                widthAndHeight={{width:isScreenSmall? '40px' : '60px',height:isScreenSmall? '40px' : '60px'}}
                onClick={()=>{
                  alert(x?._id)
                  setUserDataId(x?._id)
                }}
                badge={true}
                online={online}
                userDataId={userDataId}
                styled={{ fontSize: '13px' }}
                styledavatar={{ borderRadius: '50%', width: '30px', height: '30px', background: 'rgb(244 67 54)', color: 'white' }}
                com={x}
                status={'position-relative'}
              />
       
               
            )
          })
       
          
          
          
          
          
          
            }

        </div>
    )
}

export default Conversation
