import { useEffect, useState } from "react"
import { LuAward, LuPlus } from "react-icons/lu"
import { Create_att } from "./create_att"
import {
  LuCalendarDays,
  LuUsers,
  LuUserCheck,
  LuUserX,
  LuActivity
} from "react-icons/lu";
import CircleProgress from "../../component/circle_progress"
import { Read_att } from "./read_att";




export const Attendance_data = (item) => {


    console.log("items data" ,item)
    const [ open_create_at , set_open_cteate_at] = useState(false)
    const [ open_attendances , set_attendances] = useState(true)
    const [open_read_att,set_open_read_att] = useState(false)
const [get_att,set_att] = useState([])


    const read_all_att = async()=>{

if(!item){

    console.log("item not found")
    return false
}
        try {
            // sub/class_id
            let res = await fetch(`${import.meta.env.VITE_DOMAIN}/teacher/read/all/attendance/${item.item.subject_id}/${item.item.class_id}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })

            let data = await res.json()

            if(!res.ok){
                console.log("Attendance not fetched")
                return false
            }

            console.log(data,"Attendance Data")
set_att(data.result)
        } catch (error) {
            console.log(err)
        }
    }

    const calculatePercentage = (present, total) => {
  if (!total) return 0;
  return ((present / total) * 100)
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
};



    useEffect(()=>{
        read_all_att()
    },[])



    
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
        set_attendances(false)
    }} className="flex justify-center cursor-pointer items-center gap-3 p-3 w-fit h-fit bg-orange-300 hover:bg-orange-500 duration-100 text-white font-bold text-lg rounded-xl">
       <LuPlus/> Create Attendance
    </div>
   
</div>
<div className="w-full max-w-3xl mx-auto mt-6 space-y-6">

{get_att.map((att, index) => {

const percent = calculatePercentage(Number(att.present), Number(att.total));

return (
<div
onClick={()=>{
  set_open_cteate_at(false),
  set_open_read_att(true)
set_attendances(false)
}}
  key={index}
  className="bg-white rounded-2xl  shadow-lg p-6 border border-gray-100"
>

  {/* Header */}
  <div className="flex justify-between items-center mb-4">

    <div className="flex items-center gap-3 text-gray-700">
      <LuCalendarDays className="text-xl" />
      <h2 className="font-semibold">
        {formatDate(att.att_date)}
      </h2>
    </div>

    <div className="flex items-center gap-2 text-orange-500">
<LuActivity />
      <span className="font-bold">{percent}%</span>
    </div>

  </div>

  <div className="w-full my-5 flex flex-col gap-5 justify-center items-center ">
    <CircleProgress value={percent} size={70}/>
    <h1 className="text-gray-500 bg-orange-100 px-4 py-2 rounded-xl">Overall Performance</h1>
  </div>

  {/* Stats */}
  <div className="grid grid-cols-3 gap-4 text-center mb-5">

    <div className="bg-gray-50 p-4 rounded-xl">
      <LuUsers className="mx-auto text-gray-600 text-xl mb-1" />
      <p className="font-bold text-lg">{att.total}</p>
      <span className="text-xs text-gray-400">Total</span>
    </div>

    <div className="bg-orange-50 p-4 rounded-xl">
      <LuUserCheck className="mx-auto text-orange-600 text-xl mb-1" />
      <p className="font-bold text-lg text-orange-600">{att.present}</p>
      <span className="text-xs text-gray-400">Present</span>
    </div>

    <div className="bg-red-50 p-4 rounded-xl">
      <LuUserX className="mx-auto text-red-500 text-xl mb-1" />
      <p className="font-bold text-lg text-red-500">{att.absent}</p>
      <span className="text-xs text-gray-400">Absent</span>
    </div>

  </div>

  {/* Progress Bar */}


</div>
);
})}

</div>

    
</div>
}

{
    open_create_at && <div>
<Create_att item={item}/>

    </div>
}

{
open_read_att && <div>
  <Read_att/>
</div>
}





        </div>


    )
}