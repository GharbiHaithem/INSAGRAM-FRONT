import React from 'react'
import { ToastContainer } from 'react-toastify'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import CustomerInput from '../CustomerInput'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../../features/auth/authSlice'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const createUserState = useSelector(state=>state?.auth?.createUser)
    let schema = Yup.object().shape({
        lastname: Yup.string().required('required').max(20).min(4),
        firstname:Yup.string().required('required').min(4).max(20),
        email:Yup.string().required('required mail').email('doit etre un email valid'),
        mobile:Yup.string().required('required mobile'),
        password: Yup.string().required('required').min(4).max(20)
    })
    
    const formik = useFormik({
        initialValues: {
            firstname:'',
            lastname:'',
            email: '',
            password: '',
            mobile:''
        },
        validationSchema: schema,
        onSubmit: (values) => {
                dispatch(createUser(values))
               if(Object.keys(createUserState).length !== 0){
                navigate('/login')
                toast.success("User Created !!!")
               }
               
          
          
        }
    })

    return (
        
        <div className='register-wrapper '>


            <div className='row my-5 py-5'>


                <div className='col-md-12  col-lg-12  col-sm-12 '  >
                    <div className='form-register d-flex flex-column ' >
                        <div  className='form-registre'>
                        <h5 className='text-center text-dark text-gradient'>Register</h5>
                        <hr />
                        <p className='text-center'></p>
                        <form className='d-flex flex-column  ' onSubmit={formik.handleSubmit}>

                            <CustomerInput type={'text'} title={'last Name'} name='lastname' placeholder={'last name'}  value={formik.values.lastname} onChange={formik.handleChange('lastname')} />
                            {formik.touched.lastname && formik.errors.lastname && <span className=' text-danger  p-3'>{formik.errors.lastname}</span>}
                            <CustomerInput type={'text'} title={'First Name'} name='firstname' placeholder={'first name'} value={formik.values.firstname} onChange={formik.handleChange('firstname')} />
                            {formik.touched.lastname && formik.errors.lastname && <span className=' text-danger  p-3'>{formik.errors.lastname}</span>}
                            <CustomerInput type={'text'} title={'Mobile'} name='mobile' placeholder={'Mobile Number : '} value={formik.values.mobile} onChange={formik.handleChange('mobile')} />
                            {formik.touched.lastname && formik.errors.lastname && <span className=' text-danger  p-3'>{formik.errors.lastname}</span>}
                            <CustomerInput type={'email'} title={'Email'} name='email' placeholder={'Email ...'}  value={formik.values.email} onChange={formik.handleChange('email')} />
                            {formik.touched.email && formik.errors.email && <span className=' text-danger  p-3'>{formik.errors.email}</span>}
                            <CustomerInput type={'password'} title={'Password'} name='password' className={'form-control'} placeholder={'Password'} value={formik.values.password} onChange={formik.handleChange('password')} />
                            {formik.touched.password && formik.errors.password && <span className=' text-danger  p-3'>{formik.errors.password}</span>}
                            {/* {message && <span className='badge bg-danger p-1'>{showMessage}</span>} */}


                            {/* {msgState && <span className='badge bg-secondary p-3 text-xl-start fw-bold text-uppercase'>{msgState}</span>} */}
                            <div className='bloc-btn gap-10 flex-column d-flex'>

                                <button className='w-100 text-center  button  p-2' type='submit'><span className='text-light' >Registre</span></button>

                            </div>

                        </form>
                        </div>
                    </div>
                </div>

            </div>
        
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        {/* Same as */}
        <ToastContainer />
    </div>
    )
}

export default Register
