

function Button({name,onClick,friendName}) {
  return (
    <div>
     <button type = "button" onClick={onClick} className='text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 shadow-sm font-medium  rounded-md text-sm px-4
  py-2.5'>{name}</button>


 
    
    </div>
  )
}

export default Button
