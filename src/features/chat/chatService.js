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
const userChat = async( id) =>{
    const response = await API.get(`${base_url}/chat/${id}`)

    return await response.data
} 
const getMessage = async( id) =>{
    const response = await API.get(`${base_url}/getmessage/${id}`)

    return await response.data
} 
const createmessage = async( data) =>{
    const response = await API.post(`${base_url}/createMessage`,data)

    return await response.data
} 

const createconversation = async(data)=>{
    console.log(data)
    const response = await API.post(`${base_url}/create-chat`,data)
    console.log(response.data)
    return await response.data
}
const servicesChat = {
userChat,getMessage,createmessage,createconversation
}
export default servicesChat;
