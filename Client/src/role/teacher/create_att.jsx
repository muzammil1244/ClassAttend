import { useEffect, useRef, useState } from "react"
import Ok_button, { Delete_button } from "../../component/buttons"
import {
  LuUsers,
  LuCheck,
  LuUserX,
  LuCalendar,
  LuSquare,
  
} from "react-icons/lu";
import { Succes_Message } from "../../component/message";
import { useNavigate } from "react-router-dom";

export const Create_att = (item) => {
      let navigate = useNavigate()

useEffect(()=>{
let token = localStorage.getItem("token")
if(!token){
navigate("/login")
}
},[])
    const [get_student, set_student] = useState([])
    const [attendance, setAttendance] = useState([]);
const [show_message,set_show_message] = useState(false)

    const read_students = async () => {
        if (!item) {
            return console.log("item not found ")
        }

        try {
            let response = await fetch(`${import.meta.env.VITE_DOMAIN}/teacher/read/student/${item.item.item.class_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            let data = await response.json()
            if (!response.ok) {
                console.log("data not found of student fr")
                return false
            }

            set_student(data.result)
            const initialAttendance = data.result.map((stu) => ({
                student_id: stu.id,
                status: "A"
            }));

            setAttendance(initialAttendance);



        } catch (error) {
            return console.log(error)
        }
    }
 const checkBox = useRef()


    const handleSelect = (id) => {
        setAttendance((prev) =>
            prev.map((stu) =>
                stu.student_id === id
                    ? { ...stu, status: stu.status === "P" ? "A" : "P" }
                    : stu
            )
        );
    };



    const submit_att = async () => {

        let payload = {
            class_id: item.item.item.class_id,
            subject_id: item.item.item.subject_id,
            attendance: attendance,
            att_date:  new Date().toISOString().split("T")[0]


        }

        try {
            
            let response = await fetch(`${import.meta.env.VITE_DOMAIN}/teacher/add/attendance`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                },
                body:JSON.stringify(payload)
            })
            if(!response.ok){
               console.log("att create error")
                return false
            }
set_show_message(true)
window.location.reload()
            return console.log({
                message:"data submitted successfully",
                response
            })

        } catch (error) {
            return console.log(error)
        }
    }



    useEffect(() => {
        console.log(item, "class data")
        read_students()
    }, [])

const markAllPresent = () => {
    setAttendance(prev => prev.map(stu => ({ ...stu, status: "P" })));
};

const markAllAbsent = () => {
    setAttendance(prev => prev.map(stu => ({ ...stu, status: "A" })));
};

    const presentCount = attendance.filter(a => a.status === "P").length;
const today = new Date().toISOString().split("T")[0];


const toggleStudent = (id) => {
  setAttendance((prev) =>
    prev.map((stu) =>
      stu.student_id === id
        ? { ...stu, status: stu.status === "P" ? "A" : "P" }
        : stu
    )
  );
};

    console.log("student data", get_student)
    return (

<div className="w-full min-h-full flex flex-col">
            {/* headers */}
<div className="sticky top-0 z-10 w-full bg-white border-b border-gray-200">
<div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    {/* Title */}
    <div>
      <h1 className="text-xl font-bold text-gray-800">
        {item.item.item.subject}
      </h1>
      <p className="text-sm text-gray-500">
        {item.item.item.class_name}
      </p>
    </div>

    {/* Stats */}
<div className="flex justify-between sm:justify-start sm:gap-6 text-center">      <div>
        <p className="text-lg font-bold">{get_student.length}</p>
        <span className="text-xs text-gray-400">Total</span>
      </div>

      <div>
        <p className="text-lg font-bold text-green-600">{presentCount}</p>
        <span className="text-xs text-gray-400">Present</span>
      </div>

      <div>
        <p className="text-lg font-bold text-red-500">
          {get_student.length - presentCount}
        </p>
        <span className="text-xs text-gray-400">Absent</span>
      </div>
    </div>
  </div>
</div>
<div className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-4 flex flex-col sm:flex-row gap-3">  <button
    onClick={markAllPresent}
className="w-full sm:w-auto px-4 py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-slate-50 transition"  >
    Mark All Present
  </button>

  <button
    onClick={markAllAbsent}
className="w-full sm:w-auto px-4 py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-slate-50 transition"  >
    Reset
  </button>
</div>


<div className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-6 space-y-3">
    
      {get_student.map((student) => {

    const status =
      attendance.find(a => a.student_id === student.id)?.status;

    return (
      <div
        key={student.id}
        onClick={() => toggleStudent(student.id)}
        className={`cursor-pointer rounded-xl px-5 py-4 border transition-all duration-200
flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2        ${status === "P"
          ? "bg-green-50 border-green-200 hover:bg-green-100"
          : "bg-white border-gray-200 hover:bg-gray-50"}
        `}
      >

        {/* LEFT */}
        <div>
          <h2 className="font-semibold text-gray-800">
            {student.name}
          </h2>
          <p className="text-sm text-gray-500">
            Roll No : {student.roll_no}
          </p>
        </div>

        {/* RIGHT STATUS */}
<div className="sm:text-right flex flex-col sm:block">
    
              <p className="text-sm text-gray-400">{student.email}</p>

          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold
            ${status === "P"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-700"}
            `}
          >
            {status === "P" ? "Present" : "Absent"}
          </span>
        </div>

      </div>
    );
  })}
<div className="sticky bottom-0 bg-white border-t border-gray-200 mt-6">
    
<div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4">    <button
      onClick={submit_att}
      className="w-full bg-white  hover:bg-slate-50 text-gray-700 py-3 rounded-xl text-lg font-semibold shadow transition"
    >
      Save Attendance
    </button>
  </div>
</div>
</div>


{
    show_message&&  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            
                <div className="animate-scaleIn">
                  <Succes_Message
                  cancel={()=>set_show_message(false)}
                  heading={"The Attendance Create successfully  "}
                  message={"Attendance  has been create successfully"}
                
                  />
                </div>
            
              </div>
}
        </div>
    )
}