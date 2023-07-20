import React from 'react'
import './style.css'

const CustomerInput = ({icon,title,className,type,placeholder,name,onChange,value,style,colorText}) => {
    return (
       <div className='form-group'>
        <label className='mb-1 title-text' style={colorText} >{title}</label>
          {icon ? <div className='d-flex align-items-center gap-10'>
            <span style={{width:'20px',height:'20px' ,borderRadius:'50%',color:'#a22980'}} className='mb-0'>{icon}</span> <input className={`${className} form-control `} style={style} value={value} onChange={onChange}  name={name} type={type} placeholder={placeholder} aria-label="default input example"/>
</div> : 
 <input className={`${className} form-control `} style={style} value={value} onChange={onChange}  name={name} type={type} placeholder={placeholder} aria-label="default input example"/>
}
            </div>
    )
}

export default CustomerInput
