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


                <div className=" flex flex-col p-2  justify-between overflow-hidden overflow-y-scroll  h-full rounded-2xl bg-white w-full  col-span-1">


                    {/* heading name  */}

 {/* ================= HEADER ================= */}
    <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-xl py-4 text-center font-semibold tracking-wide">
        HOD Dashboard
    </div>


    {/* ================= MENU ================= */}
    <div className="flex-1 py-6">
        <ul className="flex flex-col gap-3 text-sm">

            <li
                onClick={open_home_fun}
                className="flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer hover:bg-orange-50 hover:text-orange-500 transition-all"
            >
                <LuHouse size={18}/> Home
            </li>

            <li
                onClick={open_teacher_fun}
                className="flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer hover:bg-orange-50 hover:text-orange-500 transition-all"
            >
                <LuSettings size={18}/> Teacher
            </li>

            <li
                onClick={open_student_fun}
                className="flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer hover:bg-orange-50 hover:text-orange-500 transition-all"
            >
                <LuUserSearch size={18}/> Student
            </li>

            <li
                onClick={open_course_fun}
                className="flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer hover:bg-orange-50 hover:text-orange-500 transition-all"
            >
                <LuSettings size={18}/> Course
            </li>

            <li
                onClick={open_classes_fun}
                className="flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer hover:bg-orange-50 hover:text-orange-500 transition-all"
            >
                <LuPlus size={18}/> Class
            </li>

            <li
                onClick={open_subjects_fun}
                className="flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer hover:bg-orange-50 hover:text-orange-500 transition-all"
            >
                <LuSettings size={18}/> Subject
            </li>

            <li
                className="flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer hover:bg-orange-50 hover:text-orange-500 transition-all"
            >
                <LuTable size={18}/> Attendance
            </li>

        </ul>
    </div>


    {/* ================= PROFILE ================= */}
    <div className="bg-gradient-to-br  from-orange-500 to-orange-400 text-white rounded-xl p-4 flex flex-col gap-3 shadow-md">

        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
            <LuUserRound size={16}/>
            <span className="text-sm">{get_profile.name}</span>
        </div>

        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
            <LuAtSign size={16}/>
            <span className="text-sm break-all">{get_profile.email}</span>
        </div>

        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
            <LuBuilding size={16}/>
            <span className="text-sm">{get_profile.department_name}</span>
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

      <Ok_button text="Apply" onClick={change_course_date} />
    </div>

    {/* Present / Total */}
    <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-5">
      <div className="flex  items-center gap-2 text-sm font-bold text-green-600">
        <LuUsersRound />
        Present: {get_course_score.present_student || 0}
      </div>
      <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
        <LuUsersRound />
        Total: {get_course_score.total_student || 0}
      </div>
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

      <div className="flex flex-col justify-center gap-4 rounded-3xl bg-gray-100 px-10 py-6 shadow-sm">
        <h1 className="text-center text-gray-600 font-semibold">
          Details
        </h1>
        <h1 className="mb-5 text-sm font-bold text-gray-500 flex gap-3 items-center justify-center">
          <LuUsersRound /> total: {get_class_score.total_student}
        </h1>
        <h1 className="mb-5 text-sm font-bold text-gray-500 flex gap-3 items-center justify-center">
          <LuUsersRound /> present: {get_class_score.present_student}
        </h1>
      </div>
    </div>

    {/* ===== Subject Cards ===== */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
      {get_subject_score.length > 0 &&
        get_subject_score.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 rounded-3xl bg-gradient-to-br from-green-100 to-green-50 p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col items-center gap-2">
              <CircleProgress size={75} value={item.percentage} />
              <h1 className="font-bold text-sm">{item.subject}</h1>
            </div>

            <div className="flex flex-col gap-2 justify-center">
              <h1 className="flex items-center gap-2 text-sm">
                <SlUser /> {item.name}
              </h1>
              <p className="text-sm">total: {item.total_students}</p>
              <p className="text-sm">present: {item.present_students}</p>
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

            </div>



            <div>


            </div>
        </div>
    )

}