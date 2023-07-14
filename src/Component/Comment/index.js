import React, { useEffect, useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { createcomments, receivecomment } from '../../features/comment/commentSlice'
import { getAllPosts } from '../../features/post/postSlice'
import { refreshdata } from '../../features/auth/authSlice'
const Comment = ({item,socket}) => {
    const userState = useSelector(state=>state?.auth?.user)
    const dispatch = useDispatch() 
    const[content,setContent] = useState('')
    const users = useSelector(state=>state?.auth?.users)
    const[stateData,setStateData] = useState(null)
    const statecomment = useSelector(state=>state?.comment)
 const handleSubmit = (e)=>{
e.preventDefault()
const newComment={
    content,
    likes:[],
    user:userState?._id,
    createdAt:new Date().toISOString(),
    postId:item?._id
    
}


async function dispatchActions() {
    await dispatch(createcomments(newComment)).unwrap(); // Attendre que l'action createcomments se termine
    socket.emit("send-comment",{
      receiveId:userState?.following,
      newpost:newComment
    })
    socket.on('receive-comment', (data) => {
      console.log('Received comment:', data);
      dispatch(receivecomment(data.newpost))
    });
  }
  
  dispatchActions();
  
  
  
  
  
  
  
  
// dispatch(createcomments(newComment))
// console.log(userState?.following)


// socket.on('receive-comment', (data) => {
//     console.log('Received comment:', data);
//     dispatch(receivecomment(newComment))
//   });
    
      


setTimeout(()=>{
    dispatch(getAllPosts())

},2000)
 }

console.log({"sockettttt:":socket})


//  useEffect(() => {
//     socket.on('receive-comment', (data) => {
//       console.log(data);
//     });
//   }, [socket]);

useEffect(()=>{

 
},[statecomment?.isSuccess,socket,dispatch])

    return (
        <div className='comment-wrapper my-3 mb-5'>
            <div className='d-flex align-items-center gap-10 my-3 mx-2 mb-3'>
              <div className='mb-0 d-flex align-items-center justify-content-center bg-warning' style={{width:'40px',height:'40px',borderRadius:'50%'}}><span className='fs-3'>{item?.postedBy?.firstname[0]}</span></div>
              <p className='mb-0'>{item?.postedBy?.lastname  + " " + item?.postedBy?.firstname}</p>
            </div>
       <form onSubmit={handleSubmit}>
       <div className='d-flex  align-items-center gap-20 '>
        <input className='' onChange={(e)=>setContent(e.target.value)} value={content} placeholder="Entrez votre texte ici" style={{width:'90%'}}/>
    
        <button type='submit' className='btn btn-sm btn-primary'> ADD </button>

        </div>
       </form>

        </div>
    )
}

export default Comment
