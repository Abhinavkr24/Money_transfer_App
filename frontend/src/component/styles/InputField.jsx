
function InputField({name,onChange}) {
  return (
     <input type="text" id="first_name" placeholder={name} required className="border-2 border-gray-300 w-full my-4 rounded-sm" onChange={onChange}/>
  )
}

export default InputField
