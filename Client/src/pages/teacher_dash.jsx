import { useEffect, useState } from "react"
import { Main } from "../role/teacher/Main"
import { Side_bar } from "../role/teacher/sid_bar"
import { Student } from "../role/teacher/student"
import { useNavigate } from "react-router-dom"

export const Teacher_dash = () => {

     let navigate = useNavigate()

useEffect(()=>{
let token = localStorage.getItem("token")
if(!token){
navigate("/login")
}
},[])
    const [open_home ,set_open_home] = useState(true)

    const [ open_student,set_open_student] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)




    return (
<div className="
w-full min-h-screen grid grid-cols-1 md:grid-cols-5
p-3 gap-2
bg-sky-50
lg:overflow-x-hidden
">
    {/* Mobile Top Bar */}
<div className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3 rounded-xl">
    
    <button
        onClick={() => setShowSidebar(true)}
        className="text-2xl font-bold"
    >
        ☰
    </button>

    <h1 className="font-semibold text-gray-700">Teacher Panel</h1>

</div>
{/* Side bar  */}
{/* Sidebar */}
<div className={`
fixed md:static top-0 left-0 z-50
h-full md:h-auto
w-[260px] md:w-full
bg-white
shadow-lg md:shadow-none
transform transition-transform duration-300

${showSidebar ? "translate-x-0" : "-translate-x-full"}
md:translate-x-0
md:col-span-1
`}>
    
    <Side_bar item={(value)=>{

        if(value == "home"){
            set_open_home(true)
            set_open_student(false)
        }
        if(value=="student"){
            set_open_home(false)
            set_open_student(true)
        }

        // 👇 auto close on mobile after click
        setShowSidebar(false)
    }}/>

</div>
{/* Overlay for mobile */}
{showSidebar && (
    <div
        className="fixed inset-0 bg-black/40 z-40 md:hidden"
        onClick={() => setShowSidebar(false)}
    />
)}

{open_home && (
    <div className="md:col-span-4 w-full min-h-[80vh] md:h-full overflow-x-hidden overflow-y-auto">
        <Main/>
    </div>
)}




{
    open_student &&<div className="md:col-span-4 w-full min-h-[80vh] md:h-full overflow-y-auto">
    <Student/>
</div>
}



        </div>
    )
}
