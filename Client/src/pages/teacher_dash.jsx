import { useState } from "react"
import { Main } from "../role/teacher/Main"
import { Side_bar } from "../role/teacher/sid_bar"
import { Student } from "../role/teacher/student"

export const Teacher_dash = () => {
    const [open_home ,set_open_home] = useState(true)
    const [ open_student,set_open_student] = useState(false)
    return (
        <div className="w-screen grid grid-cols-5  p-3 gap-4 overflow-hidden  h-screen  items-center justify-center bg-sky-50">   

{/* Side bar  */}
<div className=" col-span-1 h-full ">
    
    <Side_bar item={(value)=>{

if(value == "home"){
    set_open_home(true)
    set_open_student(false)
}if(value=="student"){
    set_open_home(false)
    set_open_student(true)
}
    }}/>
</div>

{open_home && <div className=" col-span-4 h-full overflow-hidden"> 
<Main/>
</div>


}

{
    open_student && <div className="  h-full overflow-hidden col-span-4 "> 
    <Student/>
</div>
}



        </div>
    )
}
