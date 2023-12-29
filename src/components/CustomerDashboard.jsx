import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
import {jwtDecode} from 'jwt-decode';
const CustomerDashboard = () => {
  const[token,setToken] = useState('')

  const navigation = useNavigate();



  const handleLogout = async () => {
    if (localStorage.getItem('authToken') !== null) {
      const response = await fetch('https://brand-wick.onrender.com/user/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, 
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        localStorage.removeItem('authToken');
        localStorage.clear();
        console.log('Successfully logged out',token)
        navigation('/');
      } else {
        console.error('Logout failed');
      }
    }
  };
  

  useEffect(() => {
    const checkToken = () => {
      let homeCheck = window.location.href.split("/");
      if (localStorage.getItem('authToken') === null && homeCheck[3] === "dashboard") {
        navigation('/');
      } else if (localStorage.getItem("authToken")) {
        const decodedToken = jwtDecode(localStorage.getItem("authToken"));
        const expirationTime = decodedToken.exp * 1000; 
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
          console.log('Token has expired');
          localStorage.removeItem('authToken');
          navigation('/');
        } else {
          setToken(localStorage.getItem("authToken"));
        }
      }
    };

    checkToken();
  }, [navigation]);
  


  return (
    <div className="container" >
      <h1>Welcome to HomePage</h1>
      <button onClick={handleLogout}>Logout</button>
     
      <div className='grid'>
      
       <h3>Token:</h3>
       <p>{token}</p>
      </div>
      
    </div>
  );
};

export default CustomerDashboard;

