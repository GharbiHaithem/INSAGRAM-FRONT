
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login';
import Navbar from './Component/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Component/Registre';
import ForgotPassword from './Component/ForgotPassword';
import ResetPassword from './Component/ResetPassword';
import { OpenRoute } from './routers/openroutes';
function App() {
  return (
  

      <BrowserRouter>
        <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<OpenRoute><Login /></OpenRoute>} />
          <Route path='/register' element={<OpenRoute><Register /></OpenRoute>} />
          <Route path='/forgotpassword' element={<OpenRoute><ForgotPassword/></OpenRoute>} />
          <Route path='/resetPassword/:token' element={<OpenRoute><ResetPassword/></OpenRoute>} />
          
          
        </Routes>
        </div>
      </BrowserRouter>
  
  );
}

export default App;
