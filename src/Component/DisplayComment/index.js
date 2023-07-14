import React from 'react'

const DisplayComment = ({com}) => {
  
    return (
        <div className=' p-3' style={{background:"#eee",height:"50px",width:'100%'}}>
          <span className='py-5'>  {com?.content}</span>
        </div>
    )
}

export default DisplayComment
