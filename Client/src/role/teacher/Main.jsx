
import { useEffect, useState } from "react";
import {
    LuBookOpen,
    LuSchool,
    LuUser,
    LuMail,
    LuHash,
    LuLayers
} from "react-icons/lu";
import { Attendance_data } from "../teacher/Attedance";
import { Options } from "./options";
import { useNavigate } from "react-router-dom";


export const Main = () => {
      let navigate = useNavigate()

useEffect(()=>{
let token = localStorage.getItem("token")
if(!token){
navigate("/login")
}
},[])
    const [get_classes, set_classes] = useState([])
    const [option, set_option] = useState(false)
    const [open_get_classes, set_open_get_classes] = useState(true)
    const [get_item_data, set_item_data] = useState({})
    const read_teacher_classes = async () => {

        try {

            const response = await fetch(`${import.meta.env.VITE_DOMAIN}/teacher/read/classes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await response.json()
            console.log("teacher classes data", data)
            if (!response.ok) {
                return console.log("error from reading teacher classes", data)
            }
            set_classes(data.result)


        } catch (error) {
            return console.log(error)
        }
    }

    



    useEffect(() => {
        read_teacher_classes()
    }, [])

    return (
        <div className="w-full h-full shadow overflow-x-hidden  rounded-2xl bg-white lg:p-4 sm:m-2">

            {
                open_get_classes && <>
  {/* PAGE HEADER */}
  <div className="mb-6">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
      Welcome Back 
    </h1>
    <p className="text-gray-500 mt-1 text-sm md:text-base">
      Select a class to manage attendance and view details.
    </p>
  </div>

  {/* EMPTY STATE */}
  {get_classes.length === 0 && (
    <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
      <p className="text-gray-500">No classes assigned yet.</p>
    </div>
  )}

  {/* CLASS GRID */}
  <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    {get_classes.map((cls, index) => (
      <div
        key={index}
        onClick={() => {
          set_item_data(cls);
          set_open_get_classes(false);
          set_option(true);
        }}
        className="group bg-white rounded-2xl border border-gray-200 p-5 cursor-pointer
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >

        {/* CLASS TITLE */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <LuSchool className="text-orange-500" />
            {cls.class_name}
          </h2>

          <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">
            {cls.year}
          </span>
        </div>

        {/* BADGES */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">
            {cls.course_name}
          </span>

          <span className="bg-green-50 text-green-600 text-xs px-3 py-1 rounded-full">
            {cls.subject}
          </span>
        </div>

        {/* TEACHER INFO */}
        <div className="text-sm text-gray-600 space-y-1">
          <p className="flex items-center gap-2">
            <LuUser className="text-gray-400" />
            {cls.name}
          </p>

          <p className="flex items-center gap-2 break-all">
            <LuMail className="text-gray-400" />
            {cls.email}
          </p>
        </div>

        {/* FOOTER ACTION */}
        <div className="mt-5 pt-3 border-t flex justify-between items-center">
          <span className="text-xs text-gray-400">
            Tap to Manage
          </span>

          <div className="text-orange-500 opacity-0 group-hover:opacity-100 transition">
            →
          </div>
        </div>
      </div>
    ))}
  </div>
</>

            }

            {
                option &&<div className="w-full h-full "> <Options item={get_item_data} back={()=>{
                    set_open_get_classes(true)
                    set_option(false)
                }} /></div>
            }
        </div>
    )
}   