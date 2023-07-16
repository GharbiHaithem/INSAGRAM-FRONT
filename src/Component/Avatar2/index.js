import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { RiUploadCloud2Fill } from 'react-icons/ri'
import './style.css'
import Dropzone from 'react-dropzone'
import CustomerInput from '../CustomerInput'
import { BiMessageSquareEdit } from 'react-icons/bi'
import {upload,deleteImg, resetState} from '../../features/upload/upload.slice'
import { useDispatch, useSelector } from 'react-redux'
import{RiCloseCircleLine} from 'react-icons/ri'
import { getAuser, refreshdata, updateProfileUser } from '../../features/auth/authSlice'
import { getAllPosts } from '../../features/post/postSlice'
import Spinner from '../Spinner'
const Avatar2 = ({ className, style, user, styled, styledavatar, font_size, hover, noname,showForm,configState,closeModal }) => {
  const { id } = useParams()
  const imagestate = useSelector(state=>state?.upload?.images)
  const isLoadImg = useSelector(state=>state?.upload?.isLoading)
  const userUpdate = useSelector(state=>state?.auth?.userUpdated)
  const [isHovered, setIsHovered] = useState(false);
  const [onUpload,setOnUpload] = useState(false)
  const dispatch = useDispatch()
  const fileInputRef = useRef(null);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [selectedImage, setSelectedImage] = useState(null);
 const[image,setImage] = useState([])
  const [updateProfile, setUpdateProfile] = useState(false)
 
      // Dispatch upload action if needed
   
  let img = []
  imagestate?.forEach((elem) => {
      img.push({
          public_id: elem.public_id,
          url: elem.url
      })
  })
  useEffect(() => {
  
 
    if (img.length > 0) {
        
       
    setImage(img);
      }
    }, [img]);
    
      
  const handleRemoveImage = () => {
    URL.revokeObjectURL(selectedImage);
    setSelectedImage(null);
    dispatch(deleteImg(imagestate[0]?.public_id))
  };


const handleSubmit =(e)=>{ 
    e.preventDefault()
    console.log(image)
    

   if(image.length > 0) dispatch(updateProfileUser({pic:image}))


setTimeout(()=>{
 
  if(imagestate.length !== 0 ){
    dispatch(getAllPosts())
    dispatch(refreshdata())
   dispatch(resetState())
   setImage([])
     
  }
console.log(userUpdate)
  },3000)


}



  return (
    <div className={'avatarhover'} style={style} onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} >
      <div className={'d-flex gap-10 align-items-center flex-column '} >
        {user && user?.pic?.length === 0 && selectedImage === null ? <div className=' d-flex  justify-content-center align-items-center aaaa' style={styledavatar}><span style={font_size} className={'fs-7'}>{user && user?.lastname[0]}</span></div> :  
       
        <>
          {
             <div className='position-relative'>

              <img src={onUpload ? selectedImage : ( user?.pic[0]?.url)} style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover' }} alt='' />
              <RiCloseCircleLine className='position-absolute fs-4' onClick={handleRemoveImage}/>
            </div>
          }
        </>

        }
        {!noname && <span ><p style={styled} className='mb-0 fs-7'>{user?.lastname + " " + user?.firstname}</p></span>}
      {configState && <form onClick={handleSubmit}>
          {<div className='uploadimg ' >
          {!selectedImage  &&<RiUploadCloud2Fill onClick={()=>setOnUpload(true)} className=' fs-4' /> }


            <div className='' style={{ border: '1px solid red', width: '10%', display: 'block', margin: '0 auto', transform: 'translateY(-40px)', opacity: 0 }}>

            <Dropzone onDrop={acceptedFiles => {
  setOnUpload(true)
  setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
  dispatch(upload(acceptedFiles))
}}>
{({ getRootProps, getInputProps }) => (
    <section>
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p style={{ position: "absolute", left: "0px", top: '0px', opacity: 0, width: '20px' }}>D</p>
        </div>
    </section>
)}
</Dropzone>
            </div>
          </div>}
          {isLoadImg === true ? <button className='btn btn-sm btn-primary'>LOADING &nbsp;<Spinner/></button> : <button className='btn btn-outline-success btn-sm' style={{
            margin: 'auto'
            , display: 'block',
            marginTop: '-5px'
          }} type='button'> Save Photo  </button> }
          <BiMessageSquareEdit className='d-block mx-auto fs-4' onClick={() => setUpdateProfile(!updateProfile)} />
          {updateProfile && <CustomerInput type={'text'} name={'firsttname'} placeholder={'fistname...'} />}
        </form> }

      </div>
    </div>
  )
}

export default Avatar2
