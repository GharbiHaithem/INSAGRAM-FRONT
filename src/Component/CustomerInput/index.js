import React from 'react'
import './style.css'
const CustomerInput = ({title,className,type,placeholder,name,onChange,value,style}) => {
    return (
       <div className='form-group'>
        <label className='mb-1 title-text text-light' >{title}</label>
            <input className={`${className} form-control `} style={style} value={value} onChange={onChange}  name={name} type={type} placeholder={placeholder} aria-label="default input example"/>
            </div>
    )
}

export default CustomerInput