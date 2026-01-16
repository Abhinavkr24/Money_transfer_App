import React, { useState } from 'react'
import InputField from './styles/InputField'
import { useNavigate } from 'react-router-dom'
import Button from './styles/Button'
import axios from 'axios'


function SignIn() {
  
  const [userName,setUsername] = useState("");
  const [password,setPassword] = useState("");


  const navigate = useNavigate();

  function handleClick(e){
    navigate('/signup');
  }
  return (
    <div className = "h-screen w-screen place-content-center">
     <div className = "h-128 w-100 mx-auto shadow-xl/20 p-4">

      <InputField name="username" onChange={(e)=>{setUsername(e.target.value)}}/>
      <InputField name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
      Create New account? <a href="#" className="font-medium text-indigo-600 hover:underline " onClick={handleClick}>Create here</a>
      <Button name="signin" onClick={async()=>{

        const response1 = await axios.get('https://money-transfer-app-1-25in.onrender.com/api/v1/user/signin',{
          params:{
            userName:userName,
            password:password
          }
        })
        
        localStorage.setItem('token',response1.data.token)
        if(response1){
        navigate('/Dashboard',{state:{
          userName:userName
          }})}
        }
          
          } />
      
      </div>
    </div>
  )
}

export default SignIn
