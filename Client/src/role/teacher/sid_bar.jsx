import { LuAtSign, LuBuilding, LuHouse, LuPlus, LuSettings, LuTable, LuUserRound, LuUserSearch } from "react-icons/lu"
import { SlSettings } from "react-icons/sl"

export  const Side_bar = ()=>{

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
            <span className="text-sm">abid sir</span>
        </div>

        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
            <LuAtSign size={16}/>
            <span className="text-sm break-all">abid@gmail.com</span>
        </div>

        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
            <LuBuilding size={16}/>
            <span className="text-sm">Computer Science</span>
        </div>

    </div>

        </div>
    )
}