import { useEffect, useState } from "react"
import { LuActivity, LuAtSign, LuBuilding, LuFolderArchive, LuHouse, LuPlus, LuSettings, LuTable, LuUserRound, LuUserSearch, LuUsersRound } from "react-icons/lu"
import { SlHome, SlUser } from "react-icons/sl"
import Ok_button from "../component/buttons"
import CirclePercentage from "../component/circle_progress"
import CircleProgress from "../component/circle_progress"
import { Crud_teacher } from "../role/hod/crud_teacher"
import { Crud_Student } from "../role/hod/crud_student"
import { Crud_classes } from "../role/hod/crud_classes"
import { Create_Classes } from "../role/hod/create_class"
import { Crud_subjects } from "../role/hod/crud_subject"
import { Crud_course } from "../role/hod/crud_course"

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
    const [get_class_score , set_class_score] = useState([])
const [get_subject_score ,set_subject_score ] = useState([])

    // menu buttons


    const [open_teacher, set_open_teacher] = useState(false)
    const [open_home, set_open_home] = useState(true)
    const [open_student, set_open_student] = useState(false)
    const [open_classes, set_open_classes] = useState(false)
    const [open_subjects, set_open_subjects] = useState(false)
const [open_course,set_open_course] = useState(false)
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


    const class_score = async (Class_id) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }

        // 🔹 1. Class overall score
        const classRes = await fetch(
            `${import.meta.env.VITE_DOMAIN}/hod/class/score/${Class_id}/${get_courseId_date.course}/${get_courseId_date.date}`,
            { method: "GET", headers }
        )

        const classData = await classRes.json()
        set_class_score(classData.result?.[0] || null)

        // 🔹 2. Subject wise score
        const subjectRes = await fetch(
            `${import.meta.env.VITE_DOMAIN}/hod/subject/score/${Number(Class_id)}/${get_courseId_date.course}/${get_courseId_date.date}`,
            { method: "GET", headers }
        )

        console.log("class score parameter" ,Number(Class_id),get_courseId_date.course,get_courseId_date.date )
        const subjectData = await subjectRes.json()
        set_subject_score(subjectData)

        console.log("Class score:", classData)
        console.log("Subject score:", subjectData)

    } catch (error) {
        console.log("Error fetching class/subject score:", error)
    }
}


    const read_classes = async () => {
        if (!get_courseId_date.course > 0) {
            console.log("course id not found ", get_courseId_date)
            return false
        }
        try {
            const react = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/read/class/${get_courseId_date.course}`, {
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

// const subject_scores ()=>{
//       if (!get_courseId_date.course > 0) {
//             console.log("course id not found ", get_courseId_date)
//             return false
//         }
//         try {
//             const react = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/read/class/${get_courseId_date.course}`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${localStorage.getItem("token")}`
//                 }
//             })
//             const data = await react.json()
//             console.log("classes", data.data)
//             set_classes(data.data)
//         } catch (error) {
//             return console.log(error)
//         }
// }




    const change_course_date = () => {
        course_score(Number(get_courseId_date.course), get_courseId_date.date)
    }



    // menu functions

    const open_teacher_fun = () => {
        set_open_home(false)
        set_open_teacher(true)
        set_open_student(false)
        set_open_subjects(false)
                set_open_classes(false)
set_open_course(false)

    }

    const open_home_fun = () => {
        set_open_home(true)
        set_open_teacher(false)
        set_open_student(false)
        set_open_classes(false)
        set_open_subjects(false)
set_open_course(false)


    }

    const open_student_fun = () => {
        set_open_home(false)
        set_open_teacher(false)
        set_open_student(true)
        set_open_classes(false)
        set_open_subjects(false)
set_open_course(false)

    }

    const open_classes_fun = () => {
        set_open_home(false)
        set_open_teacher(false)
        set_open_student(false)
        set_open_classes(true)
        set_open_subjects(false)
        set_open_course(false)

    }


    const open_subjects_fun = () => {
        set_open_home(false)
        set_open_teacher(false)
        set_open_student(false)
        set_open_classes(false)
        set_open_subjects(true)
        set_open_course(false)

    }

const open_course_fun = () =>{
        set_open_home(false)
        set_open_teacher(false)
        set_open_student(false)
        set_open_classes(false)
        set_open_subjects(false)
        set_open_course(true)
}




    useEffect(() => {
        read_classes()
    }, [get_courseId_date.course])

    useEffect(() => {
        profile()
        course_score()
        courses()
        // class_score()
    }, [])




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
                            <li onClick={open_home_fun} className=" bg-white shadow rounded-xl py-5 hover:scale-105 flex justify-center duration-100 cursor-pointer shadow-gray-500 p-1 text-center"><LuHouse size={20} /></li>
                            <li onClick={open_teacher_fun} className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center flex gap-3 justify-center items-center"> < LuSettings/> Teacher</li>
                            <li onClick={open_student_fun} className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center flex gap-3 justify-center items-center"> <LuUserSearch/>Student</li>
                            <li onClick={open_course_fun} className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center flex gap-3 justify-center items-center"> <LuSettings/>Course</li>
                            <li onClick={open_classes_fun} className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center flex gap-3 justify-center items-center"> < LuPlus/>Class</li>
                            <li onClick={open_subjects_fun} className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center flex gap-3 justify-center items-center" > <LuSettings/>Subject</li>
                            <li className=" bg-white shadow rounded-xl hover:scale-105 duration-100 cursor-pointer shadow-gray-500 p-1 text-center flex gap-3 justify-center items-center"><LuTable/> Attendance</li>


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



                {/* HOME */}

                {
                    open_home && <div className="col-span-4 h-full w-full rounded-2xl bg-slate-100 p-4 overflow-y-auto">

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
                        <div className="mt-4 h-fit rounded-2xl bg-white p-4 shadow-sm">
                            {/* description  */}

                            <div>
                                <p>firstly you have to choose course and after that you are able to see score or classes </p>
                            </div>

                            <div className="m-5">
                              {get_classes.length > 0 ? (
    <select
        onChange={(e) => class_score(e.target.value)}
        className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
    >
        <option value="0">Select class</option>

        {get_classes.map((item, index) => (
            <option key={index} value={item.id}>
                {item.class_name} {item.class_year}
            </option>
        ))}
    </select>
) : (
    <select className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
        <option value="0">Select course first</option>
    </select>
)}

                               
                            </div>


                            <div className="w-full  flex flex-col gap-4 justify-around items-center h-fit">

                                <div className="flex h-fit gap-5">
                                    <div className=" h-50 w-50 justify-center items-center flex flex-col gap-4 bg-orange-100 px-10 py-4 rounded-2xl">
                                        <CircleProgress size={100} value={get_class_score.percentage} />
                                        <h1 className="text-orange-500 font-bold ">class name </h1>
                                    </div>

                                    <div className=" h-50 w-50  items-center flex justify-between flex-col gap-4 bg-gray-100 px-10 py-4 rounded-2xl">
                                        <h1 className="text-orange-500 font-extralight text-xl">more</h1>
                                        <div className="flex- flex-col py-10 gap-3">
                                            <h1 className="flex gap-2 items-center text-lg justify-center"><LuUsersRound /> all :{get_class_score.total_student}</h1>
                                            <h1 className="flex gap-2 px-0 items-center text-lg justify-center"><LuUsersRound /> present :{get_class_score.present_student}</h1>

                                        </div>
                                    </div>
                                </div>
                                <p>the all subject of the classes mad by you hod </p>


                                <div className=" w-full  h-fit flex
                            items-center justify-center p-4 rounded-2xl ">

                                    <div className=" grid grid-cols-2 gap-y-5 gap-x-11 justify-around   w-fit ">


                                        <div className=" justify-around  w-80 p-4 rounded-2xl gap-2 flex  bg-green-100 ">

                                            <div className="flex w-fit h-fit flex-col justify-center items-center ">
                                                <CircleProgress size={70} />
                                                <h1 className=" font-bold text-sm ">subject name </h1>
                                            </div>

                                            <div className="w-fit h-full border-l-1 border border-white"></div>

                                            <div className="flex flex-col gap-2">
                                                <h1 className=" items-center justify-center font-extralight break-keep flex gap-2"><SlUser size={15} /> rehman sir </h1>

                                                <div className="">
                                                    <h1>total:500</h1>
                                                    <h1>present:500</h1>
                                                </div>


                                            </div>

                                        </div>


                                        <div className=" justify-around  w-80 p-4 rounded-2xl gap-2 flex  bg-green-100 ">

                                            <div className="flex w-fit h-fit flex-col justify-center items-center ">
                                                <CircleProgress size={70} />
                                                <h1 className=" font-bold text-sm ">subject name </h1>
                                            </div>


                                            <div className="flex flex-col gap-2">
                                                <h1 className=" items-center justify-center font-extralight break-keep flex gap-2"><SlUser size={15} /> rehman sir </h1>

                                                <div className="">
                                                    <h1>total:500</h1>
                                                    <h1>present:500</h1>
                                                </div>


                                            </div>

                                        </div>

                                        <div className=" justify-around  w-80 p-4 rounded-2xl gap-2 flex  bg-green-100 ">

                                            <div className="flex w-fit h-fit flex-col justify-center items-center ">
                                                <CircleProgress size={70} />
                                                <h1 className=" font-bold text-sm ">subject name </h1>
                                            </div>


                                            <div className="flex flex-col gap-2">
                                                <h1 className=" items-center justify-center font-extralight break-keep flex gap-2"><SlUser size={15} /> rehman sir </h1>

                                                <div className="">
                                                    <h1>total:500</h1>
                                                    <h1>present:500</h1>
                                                </div>


                                            </div>

                                        </div>

                                        <div className=" justify-around  w-80 p-4 rounded-2xl gap-2 flex  bg-green-100 ">

                                            <div className="flex w-fit h-fit flex-col justify-center items-center ">
                                                <CircleProgress size={70} />
                                                <h1 className=" font-bold text-sm ">subject name </h1>
                                            </div>


                                            <div className="flex flex-col gap-2">
                                                <h1 className=" items-center justify-center font-extralight break-keep flex gap-2"><SlUser size={15} /> rehman sir </h1>

                                                <div className="">
                                                    <h1>total:500</h1>
                                                    <h1>present:500</h1>
                                                </div>


                                            </div>

                                        </div>


                                    </div>

                                </div>
                            </div>


                        </div>

                    </div>

                }

                {/* Teacher */}

                {
                    open_teacher && <div className="col-span-4 h-full w-full rounded-2xl bg-slate-100 p-4 overflow-y-auto">
                        <Crud_teacher />
                    </div>
                }

                {/* Student */}

                {
                    open_student && <div className="col-span-4 h-full w-full rounded-2xl bg-slate-100 p-4 overflow-y-auto">
                        <Crud_Student />
                    </div>
                }

                {
                    open_classes && <div className="col-span-4 h-full w-full rounded-2xl bg-slate-100 p-4 overflow-y-auto">
                        <Create_Classes />
                    </div>
                }
{/* Subject */}

{
open_subjects && <div className="col-span-4 h-full w-full rounded-2xl bg-slate-100 p-4 overflow-y-auto">
                        <Crud_subjects />
                    </div>
}

{/* course */}

{
open_course &&<div className="col-span-4 h-full w-full rounded-2xl bg-slate-100 p-4 overflow-y-auto">
                        <Crud_course />
                    </div>

}

            </div>



            <div>


            </div>
        </div>
    )

}