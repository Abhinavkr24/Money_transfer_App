import React from 'react'
import PageWrapper from './styles/PageWrapper'
import InputField from './styles/InputField'
import Button from './styles/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function SignUp() {

  const[firstName,setFirstName] = useState("");
  const[lastName,setLastName] = useState("");
  const[password,setPassword] = useState("");
  const[userName,setUserName] = useState("");

  const navigate = useNavigate();

  function handleClick(e){

    navigate('/signin');
  }

  
  return (
   <div className = "h-screen w-screen place-content-center">
     <div className = "h-128 w-100 mx-auto shadow-xl/20 p-4">
      
      <InputField name="first Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <InputField name="last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
      <InputField name="password" value={password} onChange={e => setPassword(e.target.value)} />
      <InputField name="username" value={userName}onChange={e => setUserName(e.target.value)} />
      <Button name ="SignUp" onClick = {async ()=>{
        const response = await axios({
        method: 'post',
        url: 'https://money-transfer-app-1-25in.onrender.com/api/v1/user/signup',
        data: {
        userName,
        lastName,
        password,
        firstName

  }

});
     
     localStorage.setItem('token',response.data.token)
     navigate('/dashboard',{state:{userName:userName}});

      }}/>
        Already have an account? <a href="#" className="font-medium text-indigo-600 hover:underline " onClick={handleClick}>Login here</a>
      
      
     </div>
     </div>
  )
}

export default SignUp
