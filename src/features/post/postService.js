
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
const likePost = async(id)=>{
    const response = await API.put(`${base_url}/like/post/${id}`)
    console.log(response)
    return await response.data
}
const dislikePost = async(id)=>{
    const response = await API.put(`${base_url}/dislike/post/${id}`)
    console.log(response.data)
    return await response.data
}
const postServices = {
    createPost,allposts,likePost,dislikePost
}
export default postServices