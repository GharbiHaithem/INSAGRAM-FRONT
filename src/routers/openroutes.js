import { Navigate } from "react-router-dom"
export const OpenRoute =({children})=>{
const getTokenFromStorage = JSON.parse(localStorage.getItem('user'))
console.log(getTokenFromStorage)
    return getTokenFromStorage ===  null  ? children : <Navigate  to={'/'} replace={true} />
}