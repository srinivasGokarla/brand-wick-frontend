import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
const CustomerDashboard = () => {
  const[token,setToken] = useState('')

  const navigation = useNavigate();



      const handleLogout = ()=>{
      if( localStorage.getItem('authToken') !== null) {
        navigation('/')

           localStorage.clear()
      }
      
    }

    useEffect(()=>{
      
        const check = () => {
          let homeCheck = window.location.href.split("/")
        if ( localStorage.getItem('authToken') === null && homeCheck[3] === "dashboard"){
          navigation('/')
      }
      else if(localStorage.getItem("authToken")) {
        console.log()
         setToken(localStorage.getItem("authToken"))
      }
          }

    check()
    },[]) 
  


  return (
    <div className="container" >
      <h1>Welcome to HomePage</h1>
      <button onClick={handleLogout}>Logout</button>
     
      <div className='grid'>
      
       <h3>Token:</h3><span>{token}</span>
      </div>
      
    </div>
  );
};

export default CustomerDashboard;

