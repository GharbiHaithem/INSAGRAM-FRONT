import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import { IoIosCloseCircleOutline, IoMdImage } from 'react-icons/io'
import CustomerInput from '../CustomerInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import Dropzone, { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import { deleteImg, resetState, upload } from '../../features/upload/upload.slice'
import { createposts, getAllPosts } from '../../features/post/postSlice'
import Spinner from '../Spinner'
const FormModal = ({ open, setOpen, closeModal, setShowModal }) => {
    const myElementRef = useRef(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loadingUploadImgPost = useSelector(state=>state?.upload?.isLoading)


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
            
            setTimeout(() => {
               dispatch(getAllPosts())
                closeModal()
                dispatch(resetState())
            }, 1000)
            formik.resetForm()
            formik.values.images = ""
            formik.values.description = ""
        }
    })
    const uploadState = useSelector(state => state?.upload?.images)
    let img = []
    uploadState?.forEach((elem) => {
        img.push({
            public_id: elem.public_id,
            url: elem.url
        })
    })
    useEffect(() => {
        formik.values.images = img;
    }, [formik.values, img])
const Idimg =(e)=>{
dispatch(deleteImg(e))
}
    return (
        <div className='formModal' ref={myElementRef} onClick={handleClick}>

            <form className='form' onSubmit={formik.handleSubmit}>
                <div className='d-flex align-items-center justify-content-between p-3'>
                    <h6>CREATE NEW POST</h6>
                    <IoIosCloseCircleOutline onClick={() => setShowModal(false)} className='fs-4' />

                </div>
                <div className='row'>
                    <div className='bloc-img d-flex align-items-center  col-md-6  gap-10  col-sm-6 col-lg-6'  >
                        {
                            uploadState && uploadState?.map((item, index) => {
                                return (
                                
                                  (uploadState?.length <3 ) ?
                                  <>
                                    <div key={index} className='image position-relative'>
                                      
                                 
                                   <span onClick={(e)=>Idimg(item?.public_id)} className="material-symbols-outlined text-danger fs-2 position-absolute" style={{top:0,right:0}}>
                                        cancel
                                    </span>
                                    <img className='img-fluid ' style={{ height: '150px' }} src={item?.url} alt={item?.public_id} />
                                    </div>
                                    </>
                             : ("") 
                               )
                            })
                        }
                    </div>
                </div>
                <hr />
                <div style={{ height: "max-content" }}>
                    <textarea className='form-control aaaa' name='description' onChange={formik.handleChange('description')} value={formik.values.description} placeholder="Quoi de neuf ... ?" style={{ outline: 'none', border: 'none' }}></textarea>
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
                        <button type='submit' className='text-start btn btn-outline-primary  mx-3 mb-4 ' disabled={loadingUploadImgPost ? true : false} >SHARE{loadingUploadImgPost && <Spinner className={'dot-container'} />}</button>
                        <span className="material-symbols-outlined fs-1 position-relative mb-4">
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
