import { useEffect, useState } from "react"

import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineAcademicCap
} from "react-icons/hi";

import { PiStudentBold } from "react-icons/pi";

import { MdOutlineClass, MdOutlineDateRange } from "react-icons/md";

import { FaBookOpen, FaChartLine } from "react-icons/fa";

import { GoChecklist } from "react-icons/go";
export const Student_dash = ()=>{

    const [profile_data , set_profile_data] = useState({})
    const [score_data,set_score_data] = useState({})
const [get_subject_score,set_subject_score] = useState([])
const [ get_att_data,set_att_data]=useState([])

    // APIS

    const profile = async()=>{
        try {

            const res = await fetch(`${import.meta.env.VITE_DOMAIN}/student/profile/data`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }

               
            })
            
             if (!res.ok) {
                    return console.log("Error from fetching profile of the student ")
                }

                const data = await res.json()
                set_profile_data(data.result[0])

        } catch (error) {
            return console.log(error)
        }
    }


    const score = async()=>{

        try {
            
            let res = await fetch(`${import.meta.env.VITE_DOMAIN}/student/all/score`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }

            })

let data = await res.json()
set_score_data(data.result[0])
        } catch (error) {
            return console.log(error)
        }
    }
  
const subject_score = async ()=>{

    try {

        let data =await fetch(`${import.meta.env.VITE_DOMAIN}/student/subject/score`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })

        if(!data.ok){
            return console.log("fetching error")
        }
        
        let result = await data.json()
        console.log("subject scores",result)
        set_subject_score(result.data)
    } catch (error) {
        return console.log({
            message:"error from fetching  subject score of student "
            ,error
        })
    }

}


const att_data = async ()=>{

    try {
        
        let res = await fetch(`${import.meta.env.VITE_DOMAIN}/student/attendance/data`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
if(!res.ok){
    return console.log("fetching error of att data")
}
        let result = await res.json()
        console.log("data of the att",result)
        const reverse_Data = result.result.reverse()
        set_att_data(reverse_Data)

    } catch (error) {
        return console.log(error,"error from fetching att data")
    }
}






    useEffect(()=>{
profile()
score()
subject_score()
att_data()



    },[])

console.log("score Data",score_data)
console.log("Profile Data",profile_data)
console.log("subject socre data",get_subject_score)
console.log("att data",get_att_data)
   return (
  <div className="min-h-screen bg-gray-50 p-4 md:p-8">

    {/* HEADER */}
   <h1 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-orange-500 mb-6">
  <PiStudentBold className="text-3xl" />
  Student Dashboard
</h1>

    {/* PROFILE CARD */}
   <div className="bg-white shadow-md rounded-2xl p-5 mb-6 border-l-4 border-orange-400">
  <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
    <HiOutlineUser className="text-orange-500 text-xl" />
    Student Profile
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

    <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
      <HiOutlineUser className="text-gray-400 text-xl" />
      <div>
        <p className="text-xs text-gray-400">Name</p>
        <p className="font-semibold">{profile_data?.name}</p>
      </div>
    </div>

    <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
      <HiOutlineMail className="text-gray-400 text-xl" />
      <div>
        <p className="text-xs text-gray-400">Email</p>
        <p className="font-semibold">{profile_data?.email}</p>
      </div>
    </div>

    <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
      <HiOutlineAcademicCap className="text-gray-400 text-xl" />
      <div>
        <p className="text-xs text-gray-400">Roll No</p>
        <p className="font-semibold">{profile_data?.roll_no}</p>
      </div>
    </div>

    <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
      <FaBookOpen className="text-gray-400 text-xl" />
      <div>
        <p className="text-xs text-gray-400">Course</p>
        <p className="font-semibold">{profile_data?.course_name}</p>
      </div>
    </div>

    <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3 md:col-span-2">
      <MdOutlineClass className="text-gray-400 text-xl" />
      <div>
        <p className="text-xs text-gray-400">Class</p>
        <p className="font-semibold">{profile_data?.class_name}</p>
      </div>
    </div>

  </div>
</div>


    {/* OVERALL SCORE */}
   <div className="bg-white shadow-md rounded-2xl p-5 mb-6 border-l-4 border-green-400">
  <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
    <FaChartLine className="text-green-500" />
    Overall Performance
  </h2>

  <div className="flex items-center justify-between">
    <p className="text-gray-600">Attendance Percentage</p>

    <span className="text-3xl font-bold text-green-500">
      {score_data?.overall_percentage
        ? Number(score_data.overall_percentage).toFixed(1)
        : "0"}%
    </span>
  </div>

  <div className="w-full bg-gray-200 h-3 rounded-full mt-4">
    <div
      className="bg-green-500 h-3 rounded-full"
      style={{ width: `${score_data?.overall_percentage || 0}%` }}
    />
  </div>
</div>


    {/* SUBJECT ATTENDANCE */}
    <div className="mb-6">
  <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
  <GoChecklist className="text-orange-500" />
  Subject Performance
</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {get_subject_score?.map((item, index) => {
      const percent = Number(item.percentage);

      return (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-orange-400 hover:shadow-lg transition"
        >
          {/* Subject Name */}
          <h3 className="font-semibold text-gray-800 text-md mb-3">
            {item.subject_name}
          </h3>

          {/* Stats */}
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Total Lectures</span>
            <span className="font-medium">{item.total_lectures}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <span>Present</span>
            <span className="font-medium text-green-600">
              {item.present_count}
            </span>
          </div>

          {/* Percentage */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Attendance</span>
            <span className="text-lg font-bold text-orange-500">
              {percent.toFixed(1)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className={`h-2 rounded-full ${
                percent >= 75 ? "bg-green-500" : "bg-red-400"
              }`}
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          {/* Status Label */}
          <p
            className={`mt-3 text-xs font-medium ${
              percent >= 75 ? "text-green-600" : "text-red-500"
            }`}
          >
            {percent >= 75 ? "Good Attendance" : "Low Attendance"}
          </p>
        </div>
      );
    })}
  </div>
</div>


    {/* RECENT ATTENDANCE TABLE */}
    <div className="bg-white shadow-md rounded-2xl p-5">
     <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
  <MdOutlineDateRange className="text-orange-500" />
  Recent Attendance
</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-orange-50 text-gray-700">
            <tr>
              <th className="p-3">Subject</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {get_att_data?.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{item.subject}</td>

                <td className="p-3">
                  {new Date(item.att_date).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      item.status === "P"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {item.status === "P" ? "Present" : "Absent"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  </div>
);
}