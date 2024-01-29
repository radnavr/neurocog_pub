import React from 'react';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import {Route, Routes} from'react-router-dom';
import Form from './pages/Form';
import Inventory from './pages/Inventory';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Protection from './pages/Protection';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/inventar' element={<Inventory />} />
          <Route element={<Protection />}>
            <Route path='/sprava' element={<Admin />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App