import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import CustomerInput from '../CustomerInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import Dropzone, {useDropzone} from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
const FormModal = ({ open, setOpen, closeModal, setShowModal }) => {
    const myElementRef = useRef(null)
    const[file,setFile] = useState([])
    const [title, setTitle] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()






    }


    const handleClick = (event) => {
        const myElement = myElementRef.current
        if (event.target.classList.contains(`${myElement.className}`)) {
            closeModal()
        }
    }




    return (
        <div className='formModal' ref={myElementRef} onClick={handleClick}>

            <form className='form'>
                <div className='d-flex align-items-center justify-content-between p-3'>
                    <h6>CREATE NEW POST</h6>
                    <IoIosCloseCircleOutline onClick={() => setShowModal(false)} className='fs-4' />

                </div>
                <hr />
                <div style={{ height: "max-content" }}>
                    <textarea className='form-control aaaa' placeholder="Quoi de neuf ... ?" style={{ outline: 'none', border: 'none' }}></textarea>
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
                        <p className='text-start text-primary mx-3 mb-0 '>SHARE </p>
                        <span className="material-symbols-outlined fs-1 position-relative">
                            attach_file
                            <Dropzone  onDrop={acceptedFiles => console.log(acceptedFiles)}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p  style={{position:"absolute", left:"0px",top:'0px',opacity:0,width:'20px'}}>D</p>
      </div>
    </section>
  )}
</Dropzone>
                        </span>{
                            JSON.stringify(file)
                        }
                      
                    </div>
                </div>
            </form>
        </div>

    )
}

export default FormModal
