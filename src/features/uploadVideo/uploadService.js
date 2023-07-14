import axios from 'axios'
import { base_url } from '../../util/baseUrl'
// import { config } from '../../utils/axiosConfig'

const uploadVideo = async(data)=>{
    console.log(data)
const response = await axios.post(`${base_url}/upload/video`,data)
console.log(response)
return response.data
} 

const deleteImages = async(id)=>{
const response = await axios.delete(`${base_url}/delete-img/${id}`)
console.log(response)
return response.data
}
const uploadServices = {
    uploadVideo,deleteImages
}
export default uploadServices