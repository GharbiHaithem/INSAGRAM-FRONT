import React, { useEffect, useState } from 'react'
import CustomerInput from '../CustomerInput'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../features/auth/authSlice'
import backgroundImage from '../../assets/wave.svg'
import oo from '../../assets/wave (1).svg'
import {toast} from 'react-toastify'
const Login = ({socket}) => {
    const dispatch = useDispatch()
    const msg = useSelector(state=>state?.auth?.message)
    const userstate = useSelector(state=>state?.auth?.user)
    const[isMessage,setIsMessage] = useState(msg)
    let schema = Yup.object().shape({
        email: Yup.string().required('required mail').email('doit etre un email valid'),
        password: Yup.string().required('required').min(4).max(20)
    })
    const navigate = useNavigate()
    const user = useSelector(state => state?.auth)
    const { isLogin } = user
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(loginUser(values))
            socket.emit('adduser', (userId) => {
                // Gérer l'événement userConnected côté client
                console.log('Nouvel utilisateur connecté avec l\'ID :', userId);
              });
            if(msg){
               toast.error(msg)
            }
            setTimeout(() => {
           
                if (isLogin) {
                    socket.emit('adduser',userstate?._id)
                   
                    navigate('/')
                    setIsMessage('')
                }
                console.log(isLogin);
            }, 1000)



        }
    })
  useEffect(()=>{
    socket.on('userListUpdated', (updatedUserList) => {
        // Mettez à jour votre interface utilisateur avec la liste des utilisateurs en ligne (updatedUserList)
        console.log('Liste des utilisateurs mise à jour :', updatedUserList);
      
        // Par exemple, vous pouvez mettre à jour votre interface en utilisant React ou d'autres frameworks selon votre configuration.
      });
  },[])

useEffect(() => {
    console.log(isMessage?.length);
    if (isMessage?.length !== '') {
      const timer = setTimeout(() => {
        setIsMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isMessage]);
useEffect(()=>{
   if(isLogin){
    dispatch(loginUser(formik.values))
    socket.emit('adduser',userstate?._id)
    setIsMessage('')
    navigate('/')
   }
},[isLogin,navigate,socket,formik,userstate,dispatch])
    return (

    <div className='container'>
            <div className='login-wrapper '
          
            >


<div className='row my-5'>
<div className='col-md-12 col-sm-12   wwwww mx-auto'  >
    <div className='form-login-registre my-5'>

       
            <div className='form-login d-flex flex-column ' >
                <h5 className='text-center ' style={{color:'pink'}}>Login</h5>
                <hr />
                <p className='text-center'></p>
                <form className='d-flex flex-column gap-10 ' onSubmit={formik.handleSubmit} >

                    <CustomerInput type={'email'} title={'Email'} name='email' className={'form-control'} value={formik.values.email} onChange={formik.handleChange('email')} placeholder={'Email'} />
                    {formik.touched.email && formik.errors.email ? <span className='p-1 badge bg-danger rounded-2'>
                        {formik.errors.email}
                    </span> : null}
                    <CustomerInput colorText={{color:"#c33083"}} type={'password'} title={'Password'} name='password' className={'form-control'} value={formik.values.password} onChange={formik.handleChange('password')} placeholder={'Password'} />
                    {formik.touched.password && formik.errors.password ? <span className='p-1 badge bg-danger rounded-2'>
                        {formik.errors.password}
                    </span> : null}
                    {/* {message && <span className='badge bg-danger p-1'>{showMessage}</span>} */}


                    <div className='d-flex justify-content-between fs-6'>
                        <Link style={{ textDecoration: 'none' ,color:"var(--bs-pink)",fontWeight:'600'}} to='/register'>Register</Link>
                        <Link to={'/forgotpassword'} style={{ textDecoration: 'none', textAlign: 'end', marginBottom: '20px',color:"var(--bs-pink)",fontWeight:'600' }}>Forgot Password ?</Link>
                    </div>
                    <div className='bloc-btn gap-10 flex-column d-flex'>
{isMessage && <span className='fs-7 p-4 text-uppercase text-light text-center'>{isMessage}</span>}
                        <button className='w-100 text-center  button  p-2' type='submit' ><span className='text-light' >Login</span></button>

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

export default Login
