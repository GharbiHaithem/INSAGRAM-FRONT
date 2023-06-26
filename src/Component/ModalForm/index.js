import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import CustomerInput from '../CustomerInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import Dropzone, { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import { resetState, upload } from '../../features/upload/upload.slice'
import { createposts } from '../../features/post/postSlice'
const FormModal = ({ open, setOpen, closeModal, setShowModal }) => {
    const myElementRef = useRef(null)
  
    const navigate = useNavigate()
    const dispatch = useDispatch()



    const handleClick = (event) => {
        const myElement = myElementRef.current
        if (event.target.classList.contains(`${myElement.className}`)) {
            closeModal()
        }
    }
    const schema = Yup.object().shape({
        description: Yup.string().required('description de post required').max(100).min(6),

    })

    const formik = useFormik({


        initialValues: {
            description: '',
            images: ''
        },

        validationSchema: schema,

        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
          dispatch(createposts(values))
        
          setTimeout(()=>{
       closeModal()
       dispatch(resetState())    
    },2000)
          formik.resetForm()
          formik.values.images=""
          formik.values.description=""
        }
    })
    const uploadState = useSelector(state=>state?.upload?.images)
    let img=[]
    uploadState.forEach((elem)=>{
      img.push({
        public_id : elem.public_id,
        url:elem.url
      })
    })
    useEffect(() => {
        formik.values.images = img;
    }, [formik.values, img])

    return (
        <div className='formModal' ref={myElementRef} onClick={handleClick}>

            <form className='form' onSubmit={formik.handleSubmit}>
                <div className='d-flex align-items-center justify-content-between p-3'>
                    <h6>CREATE NEW POST</h6>
                    <IoIosCloseCircleOutline onClick={() => setShowModal(false)} className='fs-4' />

                </div>
                <hr />
                <div style={{ height: "max-content" }}>
                    <textarea className='form-control aaaa' name='description' onChange={formik.handleChange('description')} value={formik.values.description}  placeholder="Quoi de neuf ... ?" style={{ outline: 'none', border: 'none' }}></textarea>
                </div>
                <div>
                    <div className='d-flex justify-content-center align-items-center py-3'>
                        <span className="material-symbols-outlined fs-1">
                            perm_media
                        </span>
                        <span className="material-symbols-outlined fs-1">
                            video_camera_front
                        </span>

                    </div>
                    <div className='d-flex align-items-center '>
                        <button type='submit' className='text-start btn btn-outline-primary btn-sm mx-3 mb-0 '>SHARE </button>
                        <span className="material-symbols-outlined fs-1 position-relative">
                            attach_file
                            <Dropzone onDrop={acceptedFiles => dispatch(upload(acceptedFiles))}>
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <p style={{ position: "absolute", left: "0px", top: '0px', opacity: 0, width: '20px' }}>D</p>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </span>

                    </div>
                </div>
            </form>
        </div>

    )
}

export default FormModal
