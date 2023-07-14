import React, { useRef } from 'react'
import './style.css'
const DefaultModal = ({children,closeModal,openModal,followersState,followingState,setFollowingState,setFollowersState}) => {
    const myElementRef = useRef(null)
    const handleClick = (event) => {
        const myElement = myElementRef.current
        if (event.target.classList.contains(`${myElement.className}`)) {
            closeModal()
           if(followingState){
            setFollowingState(false)
           }
           if(followersState){
            setFollowersState(false)
           }
       
           
            
        }
    }
    return (
        <div className='formModal' ref={myElementRef} onClick={handleClick}>
            <form className='form'>
               {children}
            </form>
        </div>
    )
}

export default DefaultModal
