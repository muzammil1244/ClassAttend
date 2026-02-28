import { useEffect, useState } from "react"
import { LuAtSign, LuBuilding, LuCircleUserRound, LuHouse, LuPlus, LuSettings, LuSquareDashedBottom, LuTable, LuUserRound, LuUserSearch } from "react-icons/lu"
import {
  LuLayoutDashboard,
  LuClipboardCheck,
  LuBookOpen,
  
  LuMail,
  LuUser
} from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export  const Side_bar = ({item})=>{


    const [get_profile, set_profile] = useState({})
    const teacher_profile = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_DOMAIN}/teacher/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    
"Authorization": `Bearer ${localStorage.getItem("token")}`

                }
            })
            const data = await response.json()
            console.log("teacher profile data",data)
            if (!response.ok) {
                return console.log("error from reading teacher profile", data)
            }
            set_profile(data.result)
            console.log("teacher profile", get_profile)
        } catch (error) {
            return console.log(error)
        }
    }

    useEffect(() => {
        teacher_profile()
    }, [])
    return(

<div className="flex flex-col h-full w-full bg-white border-r border-gray-200 p-4 rounded-2xl shadow-sm">

  {/* ================= HEADER ================= */}
  <div className="mb-8">
    <h2 className="text-lg font-bold text-gray-800 tracking-wide">
      Teacher Panel
    </h2>
    <p className="text-xs text-gray-400">Attendance Management</p>
  </div>

  {/* ================= MENU ================= */}
  <div className="flex-1">
    <ul className="flex flex-col gap-2 text-sm">

      <li
        onClick={() => window.location.reload()}
        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                   text-gray-600 hover:bg-orange-50 hover:text-orange-500
                   transition-all duration-200"
      >
        <MdDashboard size={18} />
        Dashboard
      </li>

      {/* Example future menu if needed */}
      {/* 
      <li className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                     text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition">
        <LuClipboardCheck size={18} />
        Mark Attendance
      </li>

      <li className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                     text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition">
        <LuBookOpen size={18} />
        My Classes
      </li>
      */}

    </ul>
  </div>

  {/* ================= PROFILE ================= */}
  <div className="mt-6 border-t border-gray-100 pt-4">

    <div className="flex items-center gap-3 mb-4">
      <div className="bg-orange-100 text-orange-500 p-2 rounded-full">
        <LuCircleUserRound size={20} />
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800">
          {get_profile.length > 0 && get_profile[0].name}
        </p>
        <p className="text-xs text-gray-400">
          Teacher
        </p>
      </div>
    </div>

    <div className="text-xs text-gray-500 flex flex-col gap-2">

      <div className="flex items-center gap-2">
        <LuMail size={14} />
        <span className="break-all">
          {get_profile.length > 0 && get_profile[0].email}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <LuUser size={14} />
        <span>
          {get_profile.length > 0 && get_profile[0].gender}
        </span>
      </div>

    </div>

  </div>

</div>
    )
}