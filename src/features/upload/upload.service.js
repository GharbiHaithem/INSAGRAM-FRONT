import axios from 'axios'
import { base_url } from '../../util/baseUrl'
// import { config } from '../../utils/axiosConfig'

const uploadImages = async(data)=>{
const response = await axios.put(`${base_url}/upload/`,data)
console.log(response)
return response.data
} 

const deleteImages = async(id)=>{
const response = await axios.delete(`${base_url}/delete-img/${id}`)
console.log(response)
return response.data
}
const uploadServices = {
    uploadImages,deleteImages
}
export default uploadServices