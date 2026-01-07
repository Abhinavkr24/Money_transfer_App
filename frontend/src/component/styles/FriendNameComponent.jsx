import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'


function FriendNameComponent({user}) {
  const navigate = useNavigate();

  return (
    <div>
      
      {user.firstName}
      
      
    <Button name="Send Money" onClick={()=>navigate('/moneytransfer',{state:{userId:user._id}})}/>
    </div>
  )
}

export default FriendNameComponent
