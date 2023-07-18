
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 // Remplacez l'URL par l'adresse de votre serveur

function App() {
  const[showConv,setShowConv] = useState(false)
  const user = useSelector(state=>state?.auth?.user)
  const[online,setOnline] = useState([])

  const [socket,setSocket] = useState(null)
  const[onlineUsers,setOnlineUsers] = useState([])
 useEffect(()=>{
  setSocket(io('https://instagram-backend-e07m.onrender.com'));
 },[])
 useEffect(()=>{
  console.log(socket)

 if(user) socket?.emit("adduser",(user?._id))
 },[socket,user])
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
 
  const handleBeforeUnload = () => {
    socket.disconnect();
  };
  socket.on('userListUpdated', (updatedUserList) => {
    // Mettez à jour votre interface utilisateur avec la liste des utilisateurs en ligne (updatedUserList)
    console.log('Liste des utilisateurs mise à jour :', updatedUserList);
    setOnlineUsers(updatedUserList)
    // Par exemple, vous pouvez mettre à jour votre interface en utilisant React ou d'autres frameworks selon votre configuration.
  });
  window.addEventListener("beforeunload", handleBeforeUnload);
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
      window.removeEventListener("beforeunload", handleBeforeUnload);
      socket.disconnect();
    };
    
  }

  }, [socket,dispatch]);
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
          <Route  path='/chat'  element={<PrivateRoute > <Chat showConv={showConv} setShowConv={setShowConv} onlineUsers={onlineUsers} socket={socket} online={online} /> </PrivateRoute>} />
          <Route path='/login' element={<OpenRoute><Login socket={socket} /></OpenRoute>} />
          <Route path='/register' element={<OpenRoute><Register /></OpenRoute>} />
          <Route path='/forgotpassword' element={<OpenRoute><ForgotPassword/></OpenRoute>} />
          <Route path='/resetPassword/:token' element={<OpenRoute><ResetPassword/></OpenRoute>} />
          <Route  path='/profile/:id' element={<Profil/>} />
        
          
        </Routes>
        <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
        </div>
      </BrowserRouter>
  
  );
}

export default App;
