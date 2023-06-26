import { Navigate } from "react-router-dom"
export const PrivateRoute =({children})=>{
const getTokenFromStorage =localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
console.log(getTokenFromStorage)
   return getTokenFromStorage !==  null ? children : (<Navigate  to={'/login'} replace={true} />)
}