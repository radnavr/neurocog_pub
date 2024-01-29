import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import {auth} from '../config/firebase-config';
import { signOut } from 'firebase/auth'

const Navbar = () => {

  const {currentUser} = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut(auth);
  }

  return (
    <nav className="min-w-1200-px">
        <ul className="flex-row x-betweened y-centered no-list-style bg-green padding-05-rem-1-rem margin-0">
          <li>
            <Link 
              to='/' 
              className='logotype no-decoration'
            >NeuroCog</Link>
          </li>
          <div className='flex-row'>
            <li>
              <Link 
                to='/' 
                className='heading-text no-decoration margin-left-1-5-rem'
              >VYHLEDÁVÁNÍ</Link>
            </li>
            <li>
              <Link 
                to='/inventar' 
                className='heading-text no-decoration margin-left-1-5-rem'
              >INVENTÁŘ</Link>
            </li>
            <li>
              <Link 
                to='/sprava' 
                className='heading-text no-decoration margin-left-1-5-rem'
              >SPRÁVA</Link>
            </li>
            <li>
              {currentUser
                ? <Link 
                    onClick={handleLogout} 
                    className='heading-text no-decoration margin-left-1-5-rem'
                  >ODHLÁŠENÍ</Link>
                : <Link 
                    to='/login' 
                    className='heading-text no-decoration margin-left-1-5-rem'
                  >PŘIHLÁŠENÍ</Link>
              }
            </li>
          </div>
        </ul>
      </nav>
  )
}

export default Navbar