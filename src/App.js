
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login';
import Navbar from './Component/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Component/Registre';
import ForgotPassword from './Component/ForgotPassword';
import ResetPassword from './Component/ResetPassword';
import { OpenRoute } from './routers/openroutes';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from './features/post/postSlice';
import io from 'socket.io-client';
import { refreshdata, suggestusers, users } from './features/auth/authSlice';
import Profil from './Component/Profil';
import Chat from './Component/Chat';
import { PrivateRoute } from './routers/privateroutes';


 // Remplacez l'URL par l'adresse de votre serveur

function App() {
  const user = useSelector(state=>state?.auth?.user)
  const[online,setOnline] = useState([])
  const [_user,setUser] = useState(user ? user?._id : null )
  const [socket,setSocket] = useState(null)
 useEffect(()=>{
  setSocket(io('http://localhost:5000'));
 },[])
 useEffect(()=>{
  console.log(socket)
socket?.emit("adduser",(_user))
 },[socket,_user])
  const dispatch = useDispatch()
// Écoutez l'événement 'message' du serveur

useEffect(()=>{
dispatch(users())
},[dispatch])
  useEffect(()=>{
    dispatch(getAllPosts())
    console.log(user);
  
     },[dispatch,socket,user])
   useEffect(()=>{
    socket?.on("get-users",(data)=>{
      console.log(data)
      setOnline(data)
     
    })
   })
   useEffect(()=>{
    if(user !== null){
      dispatch(refreshdata())
      dispatch(suggestusers())
      
    }
      
    
   },[dispatch])

   useEffect(() => {
  if(socket !== null){
    socket.on('connect', () => {
      console.log('Connected to server');
    });
  
    socket.on('receive-comment', (data) => {
      console.log('Received comment:', data);
      dispatch(getAllPosts())
    });
    socket.on("verif-user", (user)=>{
      console.log(user)
    })
    return () => {
      socket.off('connect');
      socket.off('receive-comment');
    };
  }
  }, [socket]);
  useEffect(()=>{
if(socket !== null) socket.on("verif-user", (user)=>{
  console.log(user)
})
  },[socket])
  return (
  

      <BrowserRouter>
        <div className="App">
        <Navbar socket={socket} />
        <Routes>
          <Route exact path='/' element={<Home socket={socket} />} />
          <Route  path='/chat'  element={<PrivateRoute > <Chat  socket={socket} online={online} /> </PrivateRoute>} />
          <Route path='/login' element={<OpenRoute><Login /></OpenRoute>} />
          <Route path='/register' element={<OpenRoute><Register /></OpenRoute>} />
          <Route path='/forgotpassword' element={<OpenRoute><ForgotPassword/></OpenRoute>} />
          <Route path='/resetPassword/:token' element={<OpenRoute><ResetPassword/></OpenRoute>} />
          <Route  path='/profile/:id' element={<Profil/>} />
        
          
        </Routes>
        </div>
      </BrowserRouter>
  
  );
}

export default App;
