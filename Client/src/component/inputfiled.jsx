import { useEffect, useState } from "react"

const Text_input = ({placholder,name,type,lbname,lbval,fun__value})=>{
   
    const [set_value,get_value] = useState(null)
   
    useEffect(()=>{
fun__value=()=>get_value

    },[set_value])
   
   
   
   return <div className="flex-row flex gap-4 justify-around items-center w-full h-full">
    <label htmlFor={lbval}>{lbval}</label>
    <input type={type} placeholder={placholder} name={name}
    className=" outline-blue-300 hover:bg-white border-1 rounded-xl p-2 text-center 
  font-semibold
    "
    />
   </div>
}

export default Text_input