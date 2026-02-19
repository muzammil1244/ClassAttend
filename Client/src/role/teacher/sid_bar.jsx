import { useEffect, useState } from "react"
import { LuAtSign, LuBuilding, LuHouse, LuPlus, LuSettings, LuTable, LuUserRound, LuUserSearch } from "react-icons/lu"
import { SlSettings } from "react-icons/sl"

export  const Side_bar = ()=>{

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


        <div className="w-full p-2  flex flex-col justify-between rounded-2xl shadow  h-full bg-white">
{/* header */}
 <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-xl py-4 text-center font-semibold tracking-wide">
        Teacher Dashboard
    </div>

{/* menu items */}
<div className="flex-1 py-6">
        <ul className="flex flex-col gap-3 text-sm">

            <li
                className="flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer hover:bg-orange-50 hover:text-orange-500 transition-all"
            >
                <LuHouse size={18}/> Home
            </li>

            <li
                className="flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer hover:bg-orange-50 hover:text-orange-500 transition-all"
            >
                <LuSettings size={18}/> Teacher
            </li>

          

        

           

          

            <li
                className="flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer hover:bg-orange-50 hover:text-orange-500 transition-all"
            >
                <LuTable size={18}/> Attendance
            </li>

        </ul>
    </div>

{/* profile */}
 <div className="bg-gradient-to-br  from-orange-500 to-orange-400 text-white rounded-xl p-4 flex flex-col gap-3 shadow-md">

        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
            <LuUserRound size={16}/>
            <span className="text-sm">{get_profile.length > 0 && get_profile[0].name}</span>
        </div>

        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
            <LuAtSign size={16}/>
            <span className="text-sm break-all">{get_profile.length > 0 && get_profile[0].email}</span>
        </div>

        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
            <LuBuilding size={16}/>
            <span className="text-sm">{get_profile.length > 0 && get_profile[0].gender}</span>
        </div>

    </div>

        </div>
    )
}