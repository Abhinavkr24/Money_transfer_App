

import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import FriendNameComponent from './styles/FriendNameComponent';
import { useLocation } from 'react-router-dom'

function Dashboard() {

  const[users,setUsers] = useState([]); 
  const [filter,setFilter] = useState("");
  const location = useLocation();
  const { userName } = location.state
  const [balanceResponsehook,setBalanceResponsehook] = useState({ balance: 0 });

  const BEARER_TOKEN = localStorage.getItem('token');
  console.log(BEARER_TOKEN)
  console.log(location.state)


  useEffect(() => {
  console.log("Balance useEffect triggered");
}, []);

  

  /*useEffect( async()=>{
    const balanceResponse = await axios.get("http://localhost:4000/api/v1/account/balance", {
    headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`
    }
   })
    console.log(balanceResponse.data)
    setBalanceResponsehook(balanceResponse.data)
  },[])*/

  useEffect(() => {
    console.log("it is")
  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        "https://money-transfer-app-1-25in.onrender.com/api/v1/account/balance",
        {
          headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`
          }
        }
      );

      console.log(response.data);
      setBalanceResponsehook(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchBalance();
}, []);
  

  useEffect(()=>{
    axios.get('https://money-transfer-app-1-25in.onrender.com/api/v1/user/bulk?filter='+filter)
    .then(response=>{
      setUsers(response.data.user)
    })
  },[filter])
  

  function handleChange(e){
    setFriendName(e.target.value)
  }

  return (
     <div >
      <nav className="fixed top-0 left-0 z-20 w-full bg-white border-b border-gray-200 h-12 flex items-center ">Do Pay
        <div className="flex justify-end w-full p-1">
          {console.log(userName)}
          <p>Hello {userName}</p>
        </div>
      </nav>
      <div className="mt-12 p-4">
        <div>
       your balance : {balanceResponsehook.balance}
       
       </div>
       <div>
        <form className="max-w-md mx-auto">
  <label
    htmlFor="search"
    className="block mb-2.5 text-sm font-medium text-gray-700 sr-only"
  >
    Search
  </label>

  <div className="relative">
   
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg
        className="w-4 h-4 text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
          d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>

    
    <input
      type="search"
      id="search"
      onChange={(e)=>{setFilter(e.target.value)}}
      className="block w-full p-3 pl-9 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
      placeholder="Search"
      required
    />

    
    <button
      type="button"
      className="absolute right-1.5 bottom-1.5 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded text-xs px-3 py-1.5 shadow-sm focus:outline-none"
    >
      Search
    </button>
  </div>
</form>
<div>
  
  {users.map(user=><FriendNameComponent user={user}/>)}
</div>
       </div>

       </div>
     </div>
  )
}

export default Dashboard
