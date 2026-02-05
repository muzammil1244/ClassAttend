import { useState } from "react"
import { LuAtSign, LuBuilding, LuHouse, LuUserRound } from "react-icons/lu"
import { SlHome } from "react-icons/sl"

export const Hod_dash = ()=>{

    const [get_profile,set_profile]=useState({})



// APIs

  const profile=async ()=>{

    try {
        
    const react= await fetch(`${import.meta.env.VITE_DOMAIN}/hod/read/hod/profile`,{
        method:"GET",
        headers:{   
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
    })

    const data= await react.json()
    set_profile(data.result[0])
    console.log(data.result[0])
    


    } catch (error) {
        return console.log(error)
    }


  }  
  const courses=async ()=>{

    try {




  useState(()=>{
profile()
  },[])


return(
    <div className="w-screen p-3 h-screen bg-slate-100">
<div className="grid gap-2   h-full w-full  grid-cols-5">
    {/* side bar */}

<div className=" flex flex-col p-2  justify-between overflow-hidden h-full rounded-2xl bg-white w-full  col-span-1">
{/* heading name  */}
<div className="px-2 flex justify-around items-center rounded-2xl py-3 bg-gray-800" >
<h1 className=" text-white font-semibold">HOD Dashboard</h1>
</div>

{/* function names */}
<div className="h-full w-full py-4" >
<ul className="w-full flex flex-col justify-between h-full text-[15px] ">
    <li className=" bg-white shadow rounded-xl py-5 hover:scale-105 flex justify-center duration-100 cursor-pointer shadow-gray-500 p-1 text-center"><LuHouse size={20}/></li>
    <li className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center">Teacher</li>
        <li className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center">Student</li>
    <li className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center">Course</li>
    <li className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center">Class</li>
    <li className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center">Subject</li>
        <li className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center">Attendance</li>


</ul>
</div>

{/* profile data  */}
<div className="bg-orange-500 flex flex-col gap-2 rounded-2xl p-5 ">
<p className=" text-white text-sm bg-orange-600 p-1 rounded-xl flex gap-2 wrap-break-word items-center justify-center"> <span><LuUserRound/></span>{get_profile.name}</p>
<h1 className=" text-gray-200 bg-orange-600 p-1  rounded-xl flex wrap-break-word justify-center items-center gap-2 text-sm font-semibold"> <span><LuAtSign/></span> {get_profile.email}</h1>

<p className="text-white text-sm  bg-orange-600 p-1 rounded-xl wrap-break-word flex justify-center items-center gap-2"><span><LuBuilding/></span> {get_profile.department_name}</p>
</div>
</div>


{/* main side  */}

<div className="grid p-2 overflow-y-auto p-4 bg-green-100 w-full h-full rounded-2xl col-span-4">
    {/* overall percentage with  course*/}
<div></div>
</div>


</div>



<div>


</div>
    </div>
)

}