
import axios from 'axios'
import {base_url } from '../../util/baseUrl'
const API = axios.create({baseURL:base_url});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('user')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("user")).token
    }`
   }
   return req;
})
const createPost = async(data)=>{
    console.log(data)
   const response = await API.post(`${base_url}/create/post`,data)
 
    return await response.data
}
const allposts = async()=>{
   const response = await API.get(`${base_url}/getAllPosts`)
    return await response.data
}

const likedislikePost = async(data)=>{
    console.log(data)
    const response = await API.put(`${base_url}/likedislike/post/${data.id}`,data)
  
    return await response.data
}
const deletePost = async(id)=>{
    
    const response = await API.delete(`${base_url}/delete/post/${id}`)
  
    return await response.data
}
const postServices = {
    createPost,allposts,likedislikePost,deletePost
}
export default postServices