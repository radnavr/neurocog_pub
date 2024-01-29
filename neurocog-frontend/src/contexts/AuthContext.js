import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase-config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    })
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      { children }
    </AuthContext.Provider>
  )
}