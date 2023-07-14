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
const createComment = async(data)=>{
  
    const response = await API.post(`${base_url}/comment`,data)

    return await response.data
}
const servicesComment = {
    createComment
}
export default servicesComment