
import React, { useEffect } from 'react'
import Card from '../Card'
import Cards from '../Card'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../../features/post/postSlice'

const Home = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
   dispatch(getAllPosts())
    },[dispatch])
const car = useSelector(state=>state?.post?.posts)
    return (
        <div className='container'>
           <div className='row'>
            {
          car && car?.map((item,index)=>{
            return(
<div className='col-md-12 my-5 py-5' key={index}>
              <Cards item={item} />
                </div>
            )
          })       
            }
                          
           </div>
        </div>
    )
}

export default Home
