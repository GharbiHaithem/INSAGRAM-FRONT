import React from 'react'
import './style.css'
import Avatar from '../Avatar'
import DisplayComment from '../DisplayComment'
const ListComments = ({ post }) => {
    return (
        <>
        {post?.comments?.map((com,index)=>{
            return(<div key={index}>
            <Avatar styledavatar={{borderRadius:"50%",width:'30px',height:'30px',background:"rgb(244 67 54)",color:"white"}} styled={{fontSize:'12px'}} com={com?.user} show={true} />
            <DisplayComment com={com} />
            </div>) 
       
            
        })}
        </>
    )
}

export default ListComments
