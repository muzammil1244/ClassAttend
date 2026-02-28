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
import { Crud_att } from "../role/hod/crud_att"
import { HiClipboardList, HiOutlineUserGroup, HiUserCircle } from "react-icons/hi";
import { FiBookOpen, FiCheckCircle, FiLayers, FiMail } from "react-icons/fi";
import { PiBuilding, PiChartBar, PiClipboardFill, PiGraduationCap, PiUserCheck, PiUserCircle } from "react-icons/pi";
import {
 
  LuUsers,
 
} from "react-icons/lu";
import { MdDashboard } from "react-icons/md"
import { useNavigate } from "react-router-dom"
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
const [open_att,set_open_att] = useState(false)
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

    let navigate = useNavigate()

    useEffect(()=>{
let token = localStorage.getItem("token")
if(!token){
navigate("/login")
}
},[])
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
        console.log(course,date,"of the score fo class")
        try {
            const react = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/course/score/${course}/${date}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await react.json()
            console.log(data,"score fo the class")
            set_course_score(data.result[0])
        } catch (error) {
            return console.log(error)
        }
    }


    const class_score = async (Class_id) => {
if(!get_courseId_date.date){
  alert("Please select date to see class score")
 
  return false
}
      console.log(Class_id,"class data ",get_courseId_date.course,get_courseId_date.date)
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
        set_subject_score(subjectData.data)

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
useEffect(()=>{
let token = localStorage.getItem("token")
if(token){
navigate("/login")
}
},[])
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
        course_score(get_courseId_date.course, get_courseId_date.date)
    }



    // menu functions

    const open_teacher_fun = () => {
        set_open_home(false)
        set_open_teacher(true)
        set_open_student(false)
        set_open_subjects(false)
                set_open_classes(false)
set_open_course(false)
                set_open_att(false)

    }

    const open_home_fun = () => {
        set_open_home(true)
        set_open_teacher(false)
        set_open_student(false)
        set_open_classes(false)
        set_open_subjects(false)
set_open_course(false)
                set_open_att(false)


    }

    const open_student_fun = () => {
        set_open_home(false)
        set_open_teacher(false)
        set_open_student(true)
        set_open_classes(false)
        set_open_subjects(false)
set_open_course(false)
                set_open_att(false)

    }

    const open_classes_fun = () => {
        set_open_home(false)
        set_open_teacher(false)
        set_open_student(false)
        set_open_classes(true)
        set_open_subjects(false)
        set_open_course(false)
                set_open_att(false)

    }


    const open_subjects_fun = () => {
        set_open_home(false)
        set_open_teacher(false)
        set_open_student(false)
        set_open_classes(false)
        set_open_subjects(true)
        set_open_course(false)
                set_open_att(false)

    }

const open_course_fun = () =>{
        set_open_home(false)
        set_open_teacher(false)
        set_open_student(false)
        set_open_classes(false)
        set_open_subjects(false)
        set_open_course(true)
                set_open_att(false)

}
const open_att_fun = ()=>{
      set_open_home(false)
        set_open_teacher(false)
        set_open_student(false)
        set_open_classes(false)
        set_open_subjects(false)
        set_open_course(false)
        set_open_att(true)
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



const present = get_course_score.present_student || 0;
const total = get_course_score.total_student || 0;
const percentage = total ? ((present / total) * 100).toFixed(1) : 0;
    return (
        <div className="w-screen p-3 h-screen bg-slate-100">
            <div className="grid gap-2   h-full w-full  grid-cols-5">


                {/* side bar */}


                <div className="flex flex-col overflow-y-auto h-full w-full bg-white border-r border-gray-200 p-4 rounded-2xl shadow-sm">

  {/* ================= HEADER ================= */}
  <div className="mb-8">
    <h2 className="text-lg font-bold text-gray-800 tracking-wide">
      HOD Panel
    </h2>
    <p className="text-xs text-gray-400">Management Dashboard</p>
  </div>

  {/* ================= MENU ================= */}
  <div className="flex-1">
    <ul className="flex flex-col gap-2 text-sm">

      <li
        onClick={open_home_fun}
        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                   text-gray-600 hover:bg-orange-50 hover:text-orange-500
                   transition-all duration-200"
      >
        <MdDashboard size={18} />
        Home
      </li>

      <li
        onClick={open_teacher_fun}
        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                   text-gray-600 hover:bg-orange-50 hover:text-orange-500
                   transition-all duration-200"
      >
        <LuUsers size={18} />
        Teachers
      </li>

      <li
        onClick={open_student_fun}
        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                   text-gray-600 hover:bg-orange-50 hover:text-orange-500
                   transition-all duration-200"
      >
        <PiGraduationCap size={18} />
        Students
      </li>

      <li
        onClick={open_course_fun}
        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                   text-gray-600 hover:bg-orange-50 hover:text-orange-500
                   transition-all duration-200"
      >
        <FiLayers size={18} />
        Courses
      </li>

      <li
        onClick={open_classes_fun}
        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                   text-gray-600 hover:bg-orange-50 hover:text-orange-500
                   transition-all duration-200"
      >
        <FiBookOpen size={18} />
        Classes
      </li>

      <li
        onClick={open_subjects_fun}
        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                   text-gray-600 hover:bg-orange-50 hover:text-orange-500
                   transition-all duration-200"
      >
        <HiClipboardList size={18} />
        Subjects
      </li>

      <li
        onClick={open_att_fun}
        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                   text-gray-600 hover:bg-orange-50 hover:text-orange-500
                   transition-all duration-200"
      >
        <HiClipboardList size={18} />
        Attendance
      </li>

    </ul>
  </div>

  {/* ================= PROFILE ================= */}
  <div className="mt-6 border-t border-gray-100 pt-4">

    <div className="flex items-center gap-3 mb-4">
      <div className="bg-orange-100 text-orange-500 p-2 rounded-full">
        <PiUserCircle size={20} />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-800">
          {get_profile.name}
        </p>
        <p className="text-xs text-gray-400">
          Head of Department
        </p>
      </div>
    </div>

    <div className="text-xs text-gray-500 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <FiMail size={14} />
        <span className="break-all">{get_profile.email}</span>
      </div>

      <div className="flex items-center gap-2">
        <PiBuilding size={14} />
        <span>{get_profile.department_name}</span>
      </div>
    </div>

  </div>

</div>

                {/* main side  */}



                {/* HOME */}

                {
                    open_home && <div className="col-span-4 h-full w-full rounded-3xl bg-white p-6 overflow-y-auto">

  {/* ===== Header ===== */}
  <div className="mb-6 flex items-center justify-between rounded-3xl bg-white p-5 shadow-md">
    <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-800">
      <LuActivity className="text-blue-500" />
      {get_courseId_date.course_name || "Course"} Activity
    </h1>
  </div>

  {/* ===== Main Stats Card ===== */}
  <div className="flex flex-wrap items-center justify-between gap-8 rounded-3xl bg-white p-8 shadow-md">

    {/* Overall Attendance */}
    <div className="flex flex-col items-center gap-3">
      <CircleProgress value={get_course_score.percentage || 0} />
      <p className="text-sm font-semibold text-gray-500">
        Overall Attendance
      </p>
    </div>

    {/* Filters */}
    <div className="flex w-full max-w-xs flex-col gap-4">
      <select
        onChange={(e) => {
          const selectedId = Number(e.target.value);
          const selectedCourse = get_courses.find(item => item.id === selectedId);

          set_courseId_date(prev => ({
            ...prev,
            course: selectedCourse?.id || 0,
            course_name: selectedCourse?.name || ""
          }));
        }}
        className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
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
        className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
      />

      <Ok_button text="Apply" onClick={()=>change_course_date()} />
    </div>

    {/* Present / Total */}
 <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all duration-300">

  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-sm font-semibold text-gray-700">
      Course Attendance
    </h3>

    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
      {percentage}%
    </span>
  </div>

  {/* Stats */}
  <div className="flex flex-col gap-3">

    {/* Present */}
    <div className="flex items-center justify-between bg-green-50 rounded-xl px-4 py-3">
      <div className="flex items-center gap-3 text-green-700">
        <div className="p-2 bg-green-100 rounded-lg">
          <PiUserCheck size={16} />
        </div>
        <span className="text-sm font-medium">Present</span>
      </div>

      <span className="text-sm font-semibold text-green-800">
        {present}
      </span>
    </div>

    {/* Total */}
    <div className="flex items-center justify-between bg-orange-50 rounded-xl px-4 py-3">
      <div className="flex items-center gap-3 text-orange-700">
        <div className="p-2 bg-orange-100 rounded-lg">
          <LuUsers size={16} />
        </div>
        <span className="text-sm font-medium">Total Students</span>
      </div>

      <span className="text-sm font-semibold text-blue-800">
        {total}
      </span>
    </div>

  </div>

  {/* Footer Insight */}
  <p className="text-xs text-gray-400 mt-4">
    Overall participation rate for this course.
  </p>
</div>
  </div>

  {/* ===== Class & Subject Section ===== */}
  <div className="mt-6 rounded-3xl bg-white p-6 shadow-md">

    <p className="mb-5 text-sm font-bold text-gray-500">
       First select a course, then view class and subject-wise attendance.
    </p>

    {/* Class Selector */}
    <div className="mb-6">
      {get_classes.length > 0 ? (
        <select
          onChange={(e) => class_score(e.target.value)}
          className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        >
          <option value="0">Select Class</option>
          {get_classes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.class_name} {item.class_year}
            </option>
          ))}
        </select>
      ) : (
        <select className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm">
          <option>Select course first</option>
        </select>
      )}
    </div>

    {/* Class Stats */}
    <div className="flex flex-wrap justify-center gap-6 mb-8">

      <div className="flex flex-col items-center gap-4 rounded-3xl bg-orange-100 px-10 py-6 shadow-sm">
        <CircleProgress size={110} value={get_class_score.percentage} />
        <h1 className="text-orange-600 font-bold text-lg">
          Class Attendance
        </h1>
      </div>

       <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-3 rounded-xl bg-orange-100 text-orange-500">
          <PiChartBar size={22} />
        </div>
        <h2 className="text-lg font-semibold text-gray-700">
          Class Overview
        </h2>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-5"></div>

      {/* Total Students */}
      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mb-3">
        <div className="flex items-center gap-3 text-gray-600">
          <HiOutlineUserGroup size={20} />
          <span className="text-sm font-medium">Total Students</span>
        </div>

        <span className="text-sm font-semibold text-gray-800">
          {get_class_score.total_student}
        </span>
      </div>

      {/* Present Students */}
      <div className="flex items-center justify-between bg-green-50 rounded-xl px-4 py-3">
        <div className="flex items-center gap-3 text-green-600">
          <FiCheckCircle size={20} />
          <span className="text-sm font-medium">Present Today</span>
        </div>

        <span className="text-sm font-semibold text-green-700">
          {get_class_score.present_student}
        </span>
      </div>
    </div>
    </div>

    {/* ===== Subject Cards ===== */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
      {get_subject_score.length > 0 &&
        get_subject_score.map((item, index) => (
       <div
  key={index}
  className="
    flex items-center justify-between
    rounded-xl border border-gray-200
    bg-white
    p-5
    transition-colors duration-200
    hover:bg-gray-50
  "
>
  {/* LEFT — Progress */}
  <div className="flex items-center gap-5">
    <CircleProgress size={70} value={item.percentage} />

    <div className="flex flex-col">
      <h1 className="text-base font-semibold text-gray-800">
        {item.subject}
      </h1>
      <p className="text-sm text-gray-500">
        Attendance Overview
      </p>
    </div>
  </div>

  {/* RIGHT — Details */}
  <div className="flex flex-col gap-2 text-right">
    <h2 className="text-sm font-medium text-gray-700 flex items-center justify-end gap-2">
      <SlUser className="text-gray-400" />
      {item.teacher_name}
    </h2>

    <div className="flex gap-6 text-sm justify-end">
      <p className="text-gray-600">
        Total :
        <span className="ml-1 font-medium text-gray-800">
          {item.total_students}
        </span>
      </p>

      <p className="text-gray-600">
        Present :
        <span className="ml-1 font-semibold text-gray-900">
          {item.present_students}
        </span>
      </p>
    </div>

    {/* subtle progress line */}
    <div className="w-48 h-[5px] bg-gray-200 rounded">
      <div
        style={{ width: `${item.percentage}%` }}
        className="h-full bg-gray-700 rounded"
      />
    </div>
  </div>
</div>
        ))}
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
                        <Crud_Student course={get_courses} classes={get_classes} />
                    </div>
                }

                {
                    open_classes && <div className="col-span-4 h-full w-full rounded-2xl bg-slate-100 p-4 overflow-y-auto">
                        <Crud_classes  />
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
                        <Crud_course  course_data={get_courses} reload={()=>courses()} />
                    </div>

}

{/* attendance */}


{

open_att && <div className="col-span-4 h-full w-full rounded-2xl bg-slate-100 p-4 overflow-y-auto">

<Crud_att/>
            </div>

}

            </div>



            
        </div>
    )

}