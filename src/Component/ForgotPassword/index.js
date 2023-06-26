import React from 'react'
import CustomerInput from '../CustomerInput'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { forgotpassword, loginUser } from '../../features/auth/authSlice'
const ForgotPassword = () => {
    const dispatch = useDispatch()
    let schema = Yup.object().shape({
        email: Yup.string().required('required mail').email('doit etre un email valid'),
      
    })
    const navigate = useNavigate()
    const user = useSelector(state => state?.auth)
    const { isLogin } = user
    const formik = useFormik({
        initialValues: {
            email: '',
         
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(forgotpassword(values))
        }
    })
    return (

        <div className='container'>
            <div className='login-wrapper '>


<div className='row my-5'>
    <div className='form-login-registre my-5'>

        <div className='col-md-12 col-sm-12   wwwww mx-auto'  >
            <div className='form-login d-flex flex-column ' >
                <h5 className='text-center text-dark text-gradient'>Forgot Password</h5>
                <hr />
                <p className='text-center'></p>
                <form className='d-flex flex-column gap-10 ' onSubmit={formik.handleSubmit} >

                    <CustomerInput type={'email'} title={'Email'} name='email' className={'form-control'} value={formik.values.email} onChange={formik.handleChange('email')} placeholder={'Email'} />
                    {formik.touched.email && formik.errors.email ? <span className='p-1 badge bg-danger rounded-2'>
                        {formik.errors.email}
                    </span> : null}
                  


                  
                    <div className='bloc-btn gap-10 flex-column d-flex'>

                        <button className='w-100 text-center  button  p-2' type='submit' ><span className='text-light' >Ok</span></button>

                    </div>

                </form>
            </div>
        </div>

    </div>
</div>
</div>
        </div>

    )
}

export default ForgotPassword
