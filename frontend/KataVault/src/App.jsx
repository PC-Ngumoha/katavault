
// import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
//import Profile from './components/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Box } from '@chakra-ui/react';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
      {/* <Route path='/profile' element={<Profile/>}/> */}
    </Routes>

    </BrowserRouter>
  )
}

export default App