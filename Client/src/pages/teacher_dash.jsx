import { Main } from "../role/teacher/Main"
import { Side_bar } from "../role/teacher/sid_bar"

export const Teacher_dash = () => {
    return (
        <div className="w-screen grid grid-cols-5  p-3 gap-4 overflow-hidden  h-screen  items-center justify-center bg-sky-50">   

{/* Side bar  */}
<div className=" col-span-1 h-full ">
    
    <Side_bar/>
</div>


<div className=" col-span-4 h-full ">
<Main/>
</div>


        </div>
    )
}
