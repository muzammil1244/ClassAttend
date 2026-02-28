import { useState } from "react";
import { Student } from "./student";
import { Attendance_data } from "./Attedance";
import { LuUsers, LuClipboardList, LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export const Options = ({ item ,back }) => {
      let navigate = useNavigate()


  useEffect(()=>{
  let token = localStorage.getItem("token")
  if(!token){
navigate("/login")
}
  },[])
  const [view, setView] = useState("menu"); 
  // menu | student | attendance

  return (
<div className="w-full min-h-full bg-white rounded-2xl p-4 sm:p-2 ">
 <button
          onClick={() => back()}
          className="flex items-center gap-2 mb-4 text-sm text-gray-600 hover:text-black"
        >
          <LuArrowLeft /> Back
        </button>
      {/* ---------------- HEADER ---------------- */}
    {view !== "menu" && (
  <button
    onClick={() => setView("menu")}
    className="flex items-center gap-2 mb-4 text-sm sm:text-base text-gray-600 hover:text-black"
  >
    <LuArrowLeft /> Back
  </button>
)}

      {/* ---------------- OPTION MENU ---------------- */}
      {view === "menu" && (
<div className="
w-full
min-h-[60vh]
flex flex-col sm:flex-row
justify-center items-center
gap-6 sm:gap-8
"> 
          {/* STUDENT CARD */}
          <div
  onClick={() => setView("student")}
  className="w-full sm:w-[280px] max-w-[320px] cursor-pointer bg-white hover:bg-orange-50 border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-orange-100 text-orange-500 p-4 rounded-full">
                <LuUsers size={28} />
              </div>

              <h2 className="text-lg font-semibold">Students</h2>
              <p className="text-sm text-gray-500 text-center">
                View students, search records and check attendance %
              </p>
            </div>
          </div>

          {/* ATTENDANCE CARD */}
         <div
  onClick={() => setView("attendance")}
  className="w-full sm:w-[280px] max-w-[320px] cursor-pointer bg-white hover:bg-green-50 border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-green-100 text-green-600 p-4 rounded-full">
                <LuClipboardList size={28} />
              </div>

              <h2 className="text-lg font-semibold">Attendance</h2>
              <p className="text-sm text-gray-500 text-center">
                Mark and manage daily attendance records
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ---------------- STUDENT VIEW ---------------- */}
   {view === "student" && (
  <div className="w-full min-h-[70vh] overflow-x-auto">
    <Student item={item} />
  </div>
)}

      {/* ---------------- ATTENDANCE VIEW ---------------- */}
      {view === "attendance" && (
  <div className="w-full min-h-[70vh] overflow-x-auto">
    <Attendance_data item={item} />
  </div>
)}
    </div>
  );
};