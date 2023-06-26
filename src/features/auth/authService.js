import axios from 'axios'
import { base_url } from '../../util/baseUrl';
const API = axios.create({baseURL:base_url});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('customer')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("customer")).token
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
const servicesAuth = {
    createUser,loginUser,forgotPassword
}
export default servicesAuth