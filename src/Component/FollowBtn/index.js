import React, { useEffect, useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { followUer,unfollowUer, refreshdata, users } from '../../features/auth/authSlice'
const Follow = ({user}) => {
    const [follow,setFollow] = useState(false)
    console.log(user)
    const dispatch = useDispatch()
    const userstate = useSelector(state=>state?.auth?.user)
    useEffect(()=>{
     if(userstate?.following.includes(user?._id )){
        setFollow(true)
     }
    },[user?._id,userstate])
    console.log(follow)
    return (
        <div>
          {!follow ? (<button onClick={(e)=>{
               e.preventDefault()
                dispatch(followUer(user?._id))
                setTimeout(()=>{
                dispatch(refreshdata()) 
                },4000)
                }} className='btn btn-sm btn-outline-primary stylebtnfollow'>Follow</button>)
            :(
                <button onClick={(e)=>{
                    e.preventDefault()
                    dispatch(unfollowUer(user?._id))
                    setTimeout(()=>{
                    dispatch(refreshdata()) 
                    },4000)
                    }} className='btn btn-sm btn-outline-danger stylebtnfollow'>UnFollow</button>
            )
            }  
        </div>
    )
}

export default Follow
