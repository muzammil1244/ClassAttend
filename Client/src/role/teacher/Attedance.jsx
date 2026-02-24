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


    const [ open_create_at , set_open_cteate_at] = useState(false)
    const [ open_attendances , set_attendances] = useState(true)
    const [open_read_att,set_open_read_att] = useState(false)
    const [get_read_data,set_read_data] = useState({})
    const [get_date,set_date] = useState("")
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

set_att(data.result)
        } catch (error) {
            console.log(err)
        }
    }

    const calculatePercentage = (present, total) => {
  if (!total) return 0;
  return Math.round(((present / total) * 100)) 
};


const performance_sub = async()=>{
let data = item.item
console.log("item data for performance",data)

        try {
            let res = await fetch(`${import.meta.env.VITE_DOMAIN}/teacher/student/subject/score/${data.class_id}/${data.subject_id}`,{
              method:"GET",
              headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
              }
            })

            if(!res.ok){
              console.log("performance fetching problem ")
              return false
            }

            const datas = await res.json()

            console.log("Performance of subject " , datas)

        } catch (error) {
            return console.log(error)
        }
    }
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
        performance_sub()


    },[])

  

console.log(typeof(get_date),"daaaat")
    
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
       set_open_cteate_at(true)
       set_attendances(false)
    }} className="flex justify-center cursor-pointer items-center gap-2 px-3 py-2 w-fit h-fit bg-white hover:bg-white/30 shadow  duration-100 text-gray-700 font-bold rounded-xl">
       <LuPlus/> Create Attendance
    </div>
   
</div>
<div className="bg-white rounded-2xl shadow  max-h-[420px] overflow-y-auto">

{get_att.map((att, index) => {

const percent = calculatePercentage(Number(att.present), Number(att.total));

return (
<div
onClick={()=>{
  set_open_cteate_at(false)
  set_open_read_att(true)
  set_attendances(false)

  set_read_data({
    subject_id : item.item.subject_id,
    class_id : item.item.class_id,
    date_dat : att.att_date
  })
}}
key={index}
className="border-b last:border-0 hover:bg-orange-50 cursor-pointer transition px-4 py-3"
>

  <div className="flex items-center justify-between">

    {/* Left : Date */}
    <div className="flex items-center gap-3">
      <div className="bg-orange-100 p-2 rounded-lg">
        <LuCalendarDays className="text-orange-600 text-sm" />
      </div>

      <div>
        <p className="font-semibold text-gray-800 text-sm">
          {formatDate(att.att_date)}
        </p>
        <p className="text-xs text-gray-400">
          Attendance Record
        </p>
      </div>
    </div>

    {/* Center : Stats */}
    <div className="flex gap-6 text-xs text-center">

      <div>
        <p className="font-bold text-gray-800">{att.total}</p>
        <span className="text-gray-400">Total</span>
      </div>

      <div>
        <p className="font-bold text-green-600">{att.present}</p>
        <span className="text-gray-400">Present</span>
      </div>

      <div>
        <p className="font-bold text-red-500">{att.absent}</p>
        <span className="text-gray-400">Absent</span>
      </div>

    </div>

    {/* Right : Percentage */}
    <div className="flex items-center gap-3 w-[140px]">

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          style={{ width: `${percent}%` }}
          className="h-full bg-orange-500"
        />
      </div>

      <span className="text-sm font-semibold text-orange-600 w-10">
        {percent}%
      </span>

    </div>

  </div>

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
  <Read_att item={get_read_data}/>
</div>
}





        </div>


    )
}