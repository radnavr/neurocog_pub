import React, { useState } from 'react';
//import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase-config';

const Login = () => {

  const [userName, setUserName] = useState("");
  const handleUserNameChange = (e) => setUserName(e.target.value);

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const [loginStatus, setLoginStatus] = useState(true);

  const goTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const user = await signInWithEmailAndPassword(auth, userName, password);
        goTo('/sprava');
    } catch (error) {
        console.log(error.message);
        setLoginStatus(false);
        setTimeout(() => {
          setLoginStatus(true)
          e.target.reset();
        }, 1000);
    }
  }

  return (
    <div className="flex-row x-centered y-centered growing">
      <div className="w-300-px margin-1rem">
        <form onSubmit={handleLogin}>
          <div className={
            loginStatus ? 
            "flex-row x-centered y-centered h-40-px bg-green A-green-border" : 
            "flex-row x-centered y-centered h-40-px bg-red A-red-border"
            }
          >
            <span className="heading-text">AUTENTIZACE UŽIVATELE</span>
          </div>
          <div className="flex-column x-centered h-212-px side-borders">
            <InputField
              componentStyle="flex-column"
              inputName={"Jméno"}
              inputStyle={"common-input basic-text margin-8px-15px-16px"}
              inputType={"text"}
              labelStyle="basic-text margin-0-15px"
              onChange={handleUserNameChange}   
            />
            <InputField
              componentStyle="flex-column"
              inputName={"Heslo"}
              inputStyle={"common-input basic-text margin-8px-15px-16px"}
              inputType={"password"}
              labelStyle="basic-text margin-0-15px"
              onChange={handlePasswordChange}   
            />
          </div>
          <div className="flex-row x-centered y-centered bg-light-gray U-gray-border h-42-px">
            <Button 
              btnType={"submit"}
              btnDesignation={"btn primary w-120-px margin-0-15px"}
              btnName={"PŘIHLÁSIT"}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login