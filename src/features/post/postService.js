
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
const postServices = {
    createPost
}
export default postServices