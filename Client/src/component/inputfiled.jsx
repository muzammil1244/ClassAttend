import { useEffect, useState } from "react"

const Text_input = ({placholder,value,name,type,lbname,lbval,onChange})=>{
   
    
   
   
   
   return <div className=" w-full flex gap-2 justify-around items-center h-full">
    <label className="text-white" htmlFor={lbval}>{lbval}</label>
    <input value={value} onChange={(e)=>onChange(e.target.value)} type={type} placeholder={placholder} name={name}
    className=" outline-orange-500 bg-white hover:bg-white border-1 rounded-xl p-2 text-center 
  font-semibold
    "
    />
   </div>
}

export default Text_input