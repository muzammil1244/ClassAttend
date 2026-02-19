import { useState } from "react"
import { LuPlus } from "react-icons/lu"
import { Create_att } from "./create_att"

export const Attendance_data = (item) => {


    console.log("items data" ,item)
    const [ open_create_at , set_open_cteate_at] = useState(false)
    const [ open_attendances , set_attendances] = useState(true)

    
    return(

        <div>
{
    open_attendances &&<div>
<div className="flex justify-between">
    <div>
         <h1 className="text-2xl font-bold text-gray-800 mb-4">Attendance Management</h1>
    <p className="text-gray-600 mb-6">View and manage student attendance records for your classes.</p>
    </div>
    <div onClick={()=>{
        set_attendances(false)
        set_open_cteate_at(true)
    }} className="flex justify-center cursor-pointer items-center gap-3 p-3 w-fit h-fit bg-orange-300 hover:bg-orange-500 duration-100 text-white font-bold text-lg rounded-xl">
       <LuPlus/> Create Attendance
    </div>
   
</div>
    
</div>
}

{
    open_create_at && <div>
<Create_att item={item}/>

    </div>
}






        </div>


    )
}