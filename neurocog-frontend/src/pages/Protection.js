import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../config/firebase-config'



const Protection = () => {

    const {currentUser} = useContext(AuthContext);

    const handleAuthentication = () => {
      if (currentUser) {
        return currentUser.accessToken === auth.currentUser.accessToken;
      }
      return false;
    }

  return (
    handleAuthentication() ? <Outlet /> : <Navigate to="/login" />
  )
}

export default Protection