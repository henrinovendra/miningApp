import React, { createContext, useContext, useState } from 'react';
import client from '../api/client';
import jwt_decode from "jwt-decode";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [token, setToken] = useState('');
  const refreshToken =()=>{
    const refreshToken = async() =>{
      try{  
        const res = await client.get('/token');
        setToken(res.data.accessToken);
        console.log(res.data.accessToken)
        const decoded = jwt_decode(res.data.accessToken)
      }
      catch(err){
        console.log(err)
      }
    }
  }
  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, profile, setProfile, token, setToken }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
