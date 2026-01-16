import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';




function MoneyTransfer() {
   
   const[amountToTransfer,setAmountToTransfer] = useState(0);
   const location = useLocation();
   const { userId } = location.state;
   const [responseData,setResponseData] = useState({});

   const BEARER_TOKEN = localStorage.getItem('token');




  return (
    <div className = "h-screen w-screen place-content-center ">
     <div className = "h-128 w-100 mx-auto shadow-xl/20 p-4 relative ">
     <input
      type="search"
      id="search"
      value = {amountToTransfer}
      onChange = {(e)=>setAmountToTransfer(e.target.value)}
      className="block w-full p-3 pl-9 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
      placeholder="Amount"
      required
    />
     <div className='flex justify-center p-4'>
    <button
      type="button"
      onClick={async()=> {
       try {
      const response = await axios.put(
        "https://money-transfer-app-1-25in.onrender.com/api/v1/account/transfer",
        {
          accountId:userId,
          balance:amountToTransfer
        },
        {

          headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`
          }
        }
      );
      
      console.log(response.data);
      setResponseData(response.data);
      
    } catch (error) {
      console.error(error);
    }
  }

}
      className= "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded text-xs px-3 py-1.5 shadow-sm focus:outline-none "
    >
      Transfer
    </button>
    </div>
     </div>

     </div>
  )
}

export default MoneyTransfer
