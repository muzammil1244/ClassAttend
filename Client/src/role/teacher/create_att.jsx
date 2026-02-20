import { useEffect, useRef, useState } from "react"
import Ok_button, { Delete_button } from "../../component/buttons"
import {
  LuUsers,
  LuCheck,
  LuUserX,
  LuCalendar,
  LuSquare,
  
} from "react-icons/lu";

export const Create_att = (item) => {

    const [get_student, set_student] = useState([])
    const [attendance, setAttendance] = useState([]);


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

    console.log("student data", get_student)
    return (

        <div className="flex flex-col  justify-center items-center">

            {/* headers */}
<div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 mb-6">

    <div className="flex justify-between items-center">

        {/* Left Info */}
        <div>
            <h1 className="text-2xl font-bold text-gray-800">
                {item.item.item.subject}
            </h1>

            <p className="text-gray-500">
                {item.item.item.class_name}
            </p>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                <LuCalendar />
                {today}
            </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 text-center">

            <div>
                <LuUsers className="mx-auto text-xl text-gray-600" />
                <p className="font-bold">{get_student.length}</p>
                <span className="text-xs text-gray-400">Total</span>
            </div>

            <div>
                <LuCheck className="mx-auto text-xl text-green-600" />
                <p className="font-bold text-green-600">{presentCount}</p>
                <span className="text-xs text-gray-400">Present</span>
            </div>

            <div>
                <LuUserX className="mx-auto text-xl text-red-500" />
                <p className="font-bold text-red-500">
                    {get_student.length - presentCount}
                </p>
                <span className="text-xs text-gray-400">Absent</span>
            </div>

        </div>
    </div>
</div>
<div className="flex gap-4 mb-4">
    <button
        onClick={markAllPresent}
        className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow"
    >
        <LuSquare /> Mark All Present
    </button>

    <button
        onClick={markAllAbsent}
        className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg shadow"
    >
        <LuSquare /> Reset All
    </button>
</div>


            <div className="mt-6 w-full max-w-2xl space-y-3">
               
               {get_student.map((student) => {

const status =
attendance.find(a => a.student_id === student.id)?.status;

return (
<div
    key={student.id}
    className={`flex items-center justify-between px-5 py-4 rounded-xl shadow transition-all
    ${status === "P"
        ? "bg-orange-50 border border-orange-200"
        : "bg-gray-50 border border-gray-200"}
    `}
>

    {/* LEFT */}
    <div className="flex items-center gap-4">

        <input
            type="checkbox"
            checked={status === "P"}
            onChange={() => handleSelect(student.id)}
            className="w-5 h-5 accent-orange-600"
        />

        <div>
            <h2 className="font-semibold text-gray-800">
                {student.name}
            </h2>
            <p className="text-sm text-gray-500">
                Roll No : {student.roll_no}
            </p>
        </div>
    </div>

    {/* RIGHT */}
    <div className="text-right">
        <p className="text-sm text-gray-500">{student.email}</p>

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


                
<div className="mt-6 cursor-pointer">
    <button
        onClick={submit_att}
        className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer  text-white py-3 rounded-xl text-lg font-semibold shadow-lg transition"
    >
        Save Attendance
    </button>
</div>

            </div>

        </div>
    )
}