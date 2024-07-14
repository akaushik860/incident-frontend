import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom" 

const Login = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate() 

  async function handleLogin(){
    let data = {
      email: username,
      password: password
    }
    try{
      const response = await fetch('http://localhost:9000/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      let userData = await response.json();
      console.log(userData)
      if(userData.status === 200){
        let tmp = localStorage.getItem("sessionData")
        if(!tmp){
          localStorage.setItem("sessionData",JSON.stringify(userData))
        }
        window.location.href = "/incidents"
      }
      
      else{
        alert('Wrong username or password')
      }
      
    }catch(err){
      alert(err);
    }
    
  }

  useEffect(()=>{
    let x = localStorage.getItem("sessionData");
    if(x){
      window.location.href = "/incidents"
    }
  })
  return (
    <>
      <div className="login-box">
        <h3>USER LOGIN</h3>
        <div className="login-input">
          <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="username"></input>
          <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password"></input>
        </div>
        <div className="forgot-pass">Forgot password ?</div>
        <div onClick={handleLogin} className="login-btn">LOG ME IN</div>
      </div>
    </>
  );
};

export default Login;
