import React from 'react'
import './style.css'
const DisplayNotification = ({notification,setNotification}) => {
    return (
        <div className='notification-wrapper'>
         <span>{
            notification && notification?.map(({senderName,type,datenotif})=>{
                return (<>
                <p className='styled-text' style={{textTransform:"uppercase" , fontSize:'10px'}}>{senderName + ' ' + type + " Your post at " +" "+ datenotif}</p>
                </>)
            })
          
            }</span>
              <button className='btn btn-sm btn-primary styled' onClick={()=>setNotification([])}>Remove All Notification</button>
        </div>
    )
}

export default DisplayNotification
