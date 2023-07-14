import axios from 'axios'
import { base_url } from '../../util/baseUrl';
const API = axios.create({baseURL:base_url});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('user')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("user")).token
    }`
   }
   return req;
})

const createUser = async(data)=>{
    const response = await API.post(`${base_url}/create`,data)
    console.log(response)
    return await response.data
}
const loginUser = async(data)=>{
    const response = await API.post(`${base_url}/login`,data)
    console.log(response)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return await response.data
}
const forgotPassword = async(mail)=>{
    const response = await axios.post(`${base_url}/forgot-password`,mail)
    console.log(response.data)
    return await response.data
 }
 const allusers= async()=>{
    const response = await axios.get(`${base_url}/getallusers`)
    console.log(response.data)
    return await response.data
 }
 const suggestionusers= async()=>{
    const response = await API.get(`${base_url}/suggest-user`)
   
    return await response.data
 }
 const followuser = async(id)=>{
    const response = await API.put(`${base_url}/follow/${id}`)
   
    return await response.data
 }
 const unfollowuser = async(id)=>{
    const response = await API.put(`${base_url}/unfollow/${id}`)
   
    return await response.data
 }
 const refreshuser = async()=>{
    const response = await API.get(`${base_url}/refreshuser`)

    return await response.data
 }
 const user = async(id)=>{
    const response = await API.get(`${base_url}/user/${id}`)
   
    return await response.data
 }
 const searchUser = async(searchQuery)=>{
   const response = await API.get(`${base_url}/searchUser?searchQuery=${searchQuery}`)

   return await response.data
}
const updateProfileUser = async(data)=>{
   const response = await API.put(`${base_url}/updateProfile`,data)
   console.log(response.data)
   return await response.data
}
const servicesAuth = {
    createUser,loginUser,forgotPassword,allusers,suggestionusers,followuser,refreshuser,unfollowuser,user,searchUser,updateProfileUser
}
export default servicesAuth
