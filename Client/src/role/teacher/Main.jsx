
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


export const Main = () => {

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
        <div className="w-full h-full rounded-2xl shadow overflow-y-scroll rounded-2xl bg-white p-4">

            {
                open_get_classes && <><div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Teacher Dashboard</h1>
                    <p className="text-gray-600 mb-6">Here you can manage your classes, view student attendance, and more.</p>
                </div>

                    <div className="flex h-full flex-col gap-4 ">
                        {
                            get_classes.length == 0 ? <p className="text-gray-500">No classes assigned yet.</p> :
                                get_classes.map((cls, index) => (

                                    <div key={index} onClick={() => {
                                        set_item_data(cls)
                                        set_open_get_classes(false)
                                        set_option(true)
                                    }} className="bg-white p-5 rounded-2xl shadow-md w-full h-40 border border-gray-200 cursor-pointer hover:shadow-lg transition duration-200">

                                        {/* Class Name */}
                                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                                            <LuSchool className="text-orange-500" />
                                            {cls.class_name} {cls.year}
                                        </h2>

                                        {/* Info Section */}
                                        <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">

                                            <p className="flex items-center gap-2">
                                                <LuBookOpen />
                                                Course: <span className="font-medium"> {cls.course_name}</span>
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <LuBookOpen />
                                                Subject: <span className="font-medium"> {cls.subject}</span>
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <LuUser />
                                                Teacher: <span className="font-medium">{cls.name}</span>
                                            </p>
                                        </div>

                                        {/* Email */}
                                        <div className="mt-3 pt-2 border-t text-sm text-gray-500 flex items-center gap-2">
                                            <LuMail />
                                            {cls.email}
                                        </div>

                                    </div>
                                ))

                        }


                    </div></>

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