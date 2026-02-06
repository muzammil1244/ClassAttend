import { useState } from "react"
import { LuActivity, LuAtSign, LuBuilding, LuHouse, LuUserRound, LuUsersRound } from "react-icons/lu"
import { SlHome } from "react-icons/sl"
import Ok_button from "../component/buttons"
import CirclePercentage from "../component/circle_progress"
import CircleProgress from "../component/circle_progress"

export const Hod_dash = () => {

    const [get_profile, set_profile] = useState({})
    const [get_courses, set_courses] = useState([])
    const [get_course_score, set_course_score] = useState([])
    const [get_courseId_date, set_courseId_date] = useState({
        course: 0,
        date: "",
        course_name: ""
    })

    const [get_classes, set_classes] = useState([])

    // APIs

    const profile = async () => {

        try {

            const react = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/read/hod/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await react.json()
            set_profile(data.result[0])



        } catch (error) {
            return console.log(error)
        }


    }
    const courses = async () => {

        try {

            const react = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/read/course`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await react.json()
            set_courses(data.data)

        } catch (error) {
            return console.log(error)
        }


    }
    const course_score = async (course, date) => {
        try {
            const react = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/course/score/${course}/${date}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await react.json()
            set_course_score(data.result[0])
        } catch (error) {
            return console.log(error)
        }
    }


    const class_score = async () => {
        try {
            const react = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/class/score/${30001}/${2}/${"2026-01-10"}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await react.json()
            console.log("class score", data)
        } catch (error) {
            return console.log(error)
        }
    }

    const read_classes = async () => {
        try {
            const react = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/read/class`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await react.json()
            console.log("classes", data.data)
            set_classes(data.data)
        } catch (error) {
            return console.log(error)
        }
    }

    const change_course_date = () => {
        course_score(Number(get_courseId_date.course), get_courseId_date.date)
    }




    useState(() => {
        profile()
        course_score()
        courses()
        class_score()
        read_classes()
    }, [])

    console.log("courses all ", get_courses)



    return (
        <div className="w-screen p-3 h-screen bg-slate-100">
            <div className="grid gap-2   h-full w-full  grid-cols-5">
                {/* side bar */}

                <div className=" flex flex-col p-2  justify-between overflow-hidden h-full rounded-2xl bg-white w-full  col-span-1">
                    {/* heading name  */}
                    <div className="px-2 flex justify-around items-center rounded-2xl py-3 bg-gray-800" >
                        <h1 className=" text-white font-semibold">HOD Dashboard</h1>
                    </div>

                    {/* function names */}
                    <div className="h-full w-full py-4" >
                        <ul className="w-full flex flex-col justify-between h-full text-[15px] ">
                            <li className=" bg-white shadow rounded-xl py-5 hover:scale-105 flex justify-center duration-100 cursor-pointer shadow-gray-500 p-1 text-center"><LuHouse size={20} /></li>
                            <li className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center">Teacher</li>
                            <li className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center">Student</li>
                            <li className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center">Course</li>
                            <li className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center">Class</li>
                            <li className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center">Subject</li>
                            <li className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center">Attendance</li>


                        </ul>
                    </div>

                    {/* profile data  */}
                    <div className="bg-orange-500 flex flex-col gap-2 rounded-2xl p-5 ">
                        <p className=" text-white text-sm bg-orange-600 p-1 rounded-xl flex gap-2 wrap-break-word items-center justify-center"> <span><LuUserRound /></span>{get_profile.name}</p>
                        <h1 className=" text-gray-200 bg-orange-600 p-1  rounded-xl flex wrap-break-word justify-center items-center gap-2 text-sm font-semibold"> <span><LuAtSign /></span> {get_profile.email}</h1>

                        <p className="text-white text-sm  bg-orange-600 p-1 rounded-xl wrap-break-word flex justify-center items-center gap-2"><span><LuBuilding /></span> {get_profile.department_name}</p>
                    </div>
                </div>


                {/* main side  */}

                <div className="col-span-4 h-full w-full rounded-2xl bg-slate-100 p-4 overflow-y-auto">

                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                        <h1 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                            {get_courseId_date.course_name || "Course"} Activity
                            <LuActivity className="text-blue-500" />
                        </h1>
                    </div>

                    {/* Main Card */}
                    <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-white p-6 shadow-sm">

                        {/* Circular Progress */}
                        <div className="flex flex-col items-center gap-2">
                            <CircleProgress value={get_course_score.percentage || 0} />
                            <p className="text-sm font-medium text-gray-500">Overall Attendance</p>
                        </div>

                        {/* Filters */}
                        <div className="flex w-full max-w-xs flex-col gap-4">
                            <select
                                onChange={(e) => {
                                    const selectedId = Number(e.target.value);
                                    const selectedCourse = get_courses.find(
                                        item => item.id === selectedId
                                    );

                                    set_courseId_date(prev => ({
                                        ...prev,
                                        course: selectedCourse?.id || 0,
                                        course_name: selectedCourse?.name || ""
                                    }));
                                }}
                                className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            >
                                <option value="0">Select Course</option>
                                {get_courses.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="date"
                                onChange={(e) =>
                                    set_courseId_date(pre => ({
                                        ...pre,
                                        date: e.target.value
                                    }))
                                }
                                className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                            />

                            <Ok_button text="Apply" onClick={change_course_date} />
                        </div>

                        {/* Stats */}
                        <div className="flex flex-col gap-3 rounded-xl bg-slate-50 px-6 py-4">
                            <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                                <LuUsersRound />
                                Present: {get_course_score.present_student || 0}
                            </div>

                            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                                <LuUsersRound />
                                Total: {get_course_score.total_student || 0}
                            </div>
                        </div>

                    </div>

                    {/* Future Section */}
                    <div className="mt-4 h-32 rounded-2xl bg-white p-4 shadow-sm">
                        {/* description  */}

                        <div>
                            <p>firstly you have to choose course and after that you are able to see score or classes </p>
                            </div>

                            {/* descrioption */}
                    </div>

                </div>



            </div>



            <div>


            </div>
        </div>
    )

}