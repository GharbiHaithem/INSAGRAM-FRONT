import React, { useEffect, useState } from 'react'
import './style.css'
import insta from '../../assets/png-clipart-letter-instagram-font-instagram-text-logo-removebg-preview(1).png'
import { Link, json, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead';
import { CiDark } from 'react-icons/ci'
import Dropdown from 'react-bootstrap/Dropdown';
import CustomerInput from '../CustomerInput'
import FormModal from '../ModalForm'
import DisplayNotification from '../DisplayNotification'
import {LuSettings2} from 'react-icons/lu'
import {AiOutlineLogout} from 'react-icons/ai'
import DefaultModal from '../DefaultModal'
import Avatar2 from '../Avatar2'
import Avatar from '../Avatar'
import { logout } from '../../features/auth/authSlice'
import {FiInstagram} from 'react-icons/fi'
const Navbar = ({socket}) => {
  
    const location = useLocation()
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    const userstate = useSelector(state=>state?.auth?.user)
    const [mode, setMode] = useState(false)
    const navigate = useNavigate()
    console.log(location.pathname)
    function isActive(currentPath, targetPath) {
        return currentPath === targetPath;
    }
    const[showModal,setShowModal] =useState(false)
  
    const[openN,setOpenN] = useState(false)
    const [isScreenSmall, setIsScreenSmall] = useState(false);
    const userState = useSelector(state => state?.auth?.user)
    
    useEffect(() => {
        const handleResize = () => {
            const isSmall = window.matchMedia("(max-width: 600px)").matches;
            setIsScreenSmall(isSmall);
        };

        // Ajoute un écouteur d'événement pour détecter les changements de taille d'écran
        window.addEventListener("resize", handleResize);

        // Vérifie la taille de l'écran au chargement initial de la page
        handleResize();
        console.log(isScreenSmall)
        // Nettoie l'écouteur d'événement lorsque le composant est démonté
        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, [isScreenSmall]);
    useEffect(() => {
        console.log(isActive(location.pathname, '/login'))
    }, [location.pathname])
    const [search, setSearch] = useState(false)
    const open = ()=>{
        setShowModal(true)
    }
    // const[notification,setNotification] = useState([])
    // useEffect(()=>{
    //     console.log(socket);
    //     if(socket !== null){
    //         socket.on("getNotification",data=>{
    //             console.log(data);
    //             setNotification((prev)=>[...prev,data])
               
    //           })
    //     }
     
    // },[socket])

    // console.log(notification)
  const[configState,setConfigState] = useState(false)
  const closeModal = ()=>{
   if(showModal){
    setShowModal(false)
   }
   if(configState){
    setConfigState(false)
   }
    
}
const[isHover,setIsHover] = useState(false)
const dispatch = useDispatch()
    return (
        <div className='container'>
            <div className='navbar-wrapper'>
    
                <Link  to={'/'} className={`${search ? 'xxx' : `${user === null ? 'not-connected' : 'img-box'}`}`}>
                {isScreenSmall ?  <FiInstagram style={{transform:"translateY:(70px)"}} /> : <img src={ insta} style={{ color: "red" }} alt='instagram' />}    
                </Link>

                {user === null ? <>
                    <ul className="menu">
                        <Link to={'/login'} ><li className={isActive(location.pathname, '/login') ? 'active' : ''}>Login</li></Link>
                        <Link to={'/register'}><li className={isActive(location.pathname, '/register') ? 'active' : ''}>Registre</li></Link>
                    </ul> </> : (
                    <div className={` menu-p  d-flex align-items-center  justify-content-between ${isScreenSmall ? 'gap-5' : 'gap-50'}`} style={{ transform: 'translateY(20px)', width: '80%' }}>
                       {!isScreenSmall && <div className='search-box'>
                            <span onClick={() => setSearch(true)} className={`material-symbols-outlined pointer ${search && "d-none"} ${isScreenSmall ? 'fs-5' : 'fs-1'}`} style={{ transform: `translateY(${isScreenSmall ? "3px" : "0"})` }} >
                                search
                            </span>
                            {search && <CustomerInput className={'search'} style={{ transform: 'translateY(-10px)', position: "relative" }} placeholder={'Search ...'} type={'text'} />}
                            {search &&<span onClick={()=>setSearch(false)} className="material-symbols-outlined position-absolute" style={{top:23,right:`${isScreenSmall ? '10px' : '345px'}`}}>
                                cancel
                            </span> }
                        </div>
}
                        <div className={`d-flex align-items-center ${isScreenSmall && search ? "d-none" : "d-block"} ${isScreenSmall ? 'gap-20' : 'gap-30'} `}>
                            <span className={` position-relative material-symbols-outlined pointer ${isScreenSmall ? 'fs-5' : 'fs-1'}`} onClick={()=>setOpenN(!openN)} >
                                favorite
                                {openN && <DisplayNotification  />}
                            </span>
                            <span className={`material-symbols-outlined pointer ${isScreenSmall ? 'fs-5' : 'fs-1'}`} onClick={()=>setShowModal(true)}>
                                data_saver_on
                            </span>
                            <span className={`material-symbols-outlined pointer ${isScreenSmall ? 'fs-5' : 'fs-1'}`}   onClick={()=>navigate('/chat')} >
                                sms
                            </span>
                        </div>
                        <Dropdown className={`drop-down ${isScreenSmall && search ? "d-none" : "d-block"}`}>
                            {userState && userState?.pic[0]?.length === 0 ?
                        <Dropdown.Toggle variant='light' id="dropdown-basic" style={{ width: '50px',color:'white', height: '50px', borderRadius: '50%', background:"rgb(244 67 54)" }}>
                        <span style={{ fontWeight: "700" }}>{userState?.lastname[0]}</span>
                    </Dropdown.Toggle> : 
                     <Dropdown.Toggle  id="dropdown-basic" style={{background:'transparent',outline:'none',border:'none'}}>
                    <Avatar  widthAndHeight={{width:`${isScreenSmall ? "40px" : "80px"}` , height:`${isScreenSmall ? "40px" : "80px"}` }} com={userState} />
                 </Dropdown.Toggle>  
                        } 

                            <Dropdown.Menu>
                                <Dropdown.Item   className='p-3'onClick={()=>setConfigState(true)} ><LuSettings2 className='fs-4' />&nbsp;&nbsp; Settings</Dropdown.Item>
                                <Dropdown.Item  onClick={()=>{
                                       dispatch(logout())
                                       navigate('/login')
                                }} className='p-3'><AiOutlineLogout className='fs-4'  />&nbsp;&nbsp;Logout</Dropdown.Item>
                          
                            </Dropdown.Menu>
                        </Dropdown>

                        {!search && !isScreenSmall && <div className='dark-mode ' > {mode && mode ? <span style={{ transform: `translateY(${isScreenSmall ? "3px" : "0"})` }} className={`material-symbols-outlined ${isScreenSmall ? 'fs-5' : 'fs-1'}`} onClick={() => setMode(!mode)}>
                            toggle_off
                        </span> : <span style={{ transform: `translateY(${isScreenSmall ? "3px" : "0"})` }} className={`material-symbols-outlined ${isScreenSmall ? 'fs-5' : 'fs-1'}`} onClick={() => setMode(!mode)}>
                            wb_sunny
                        </span>}
                        </div>}
                    </div>
                )}



            </div>
            {showModal && <FormModal closeModal={closeModal} open={open} setShowModal={closeModal}/>}
           
            {configState && <DefaultModal closeModal={closeModal} >
               <Avatar2 configState={configState} closeModal={closeModal}  font_size={{fontSize:'35px',fontWeight:'700'}} noname styledavatar={{ borderRadius: '50%', width: '180px', height: '180px', background: 'rgb(244 67 54)', color: 'white' }}   styled={{fontSize:'20px',marginRight:'20px'}} user={userstate} />
            </DefaultModal>}
        </div>
    )
}

export default Navbar
