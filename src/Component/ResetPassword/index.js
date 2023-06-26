import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomerInput from '../CustomerInput'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import* as Yup from 'yup'
import './style.css'
const ResetPassword = () => {
    const {token} = useParams()
    const dispatch = useDispatch()
    let schema = Yup.object().shape({
        email: Yup.string().required('required mail').email('doit etre un email valid'),
      
    })

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmpassword:''
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch((values))
        }
    })
    return (
        <div className='container'>
           <div className='login-wrapper '>


<div className='row my-5'>
    <div className='form-login-registre my-5'>

        <div className='col-md-12 col-sm-12   wwwww mx-auto'  >
            <div className='form-login d-flex flex-column ' >
                <h5 className='text-center text-dark text-gradient'>Reset Password</h5>
                <hr />
                <p className='text-center'></p>
                <form className='d-flex flex-column gap-10 ' onSubmit={formik.handleSubmit} >

                    <CustomerInput type={'password'} title={'password'} name='password' className={'form-control'} value={formik.values.password} onChange={formik.handleChange('password')} placeholder={'password'} />
                    {formik.touched.password && formik.errors.password ? <span className='p-1 badge bg-danger rounded-2'>
                        {formik.errors.password}
                    </span> : null}
                  
                    <CustomerInput type={'password'} title={'re-password'} name='confirmpassword' className={'form-control'} value={formik.values.confirmpassword} onChange={formik.handleChange('confirmpassword')} placeholder={'re-password'} />
                    {formik.touched.confirmpassword && formik.errors.confirmpassword ? <span className='p-1 badge bg-danger rounded-2'>
                        {formik.errors.confirmpassword}
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

export default ResetPassword
