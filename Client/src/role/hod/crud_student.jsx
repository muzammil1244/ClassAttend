import { LuAtom, LuAtSign, LuIndentDecrease, LuLock, LuPhone, LuUserRound } from "react-icons/lu"
import Text_input from "../../component/inputfiled"
import { SlControlPause, SlLock, SlPhone } from "react-icons/sl"
import Ok_button, { Cancel_button, Delete_button } from "../../component/buttons"
import { useEffect, useState } from "react"
import CircleProgress from "../../component/circle_progress"

export const Crud_Student = ({course}) => {

const [get_courses,set_courses] = useState([])
const [get_classes,set_classes] = useState([])

const [selectedCourse,setSelectedCourse] = useState({})
const [selectedClass,setSelectedClass] = useState(null)
const [students,setStudents] = useState([])
const [searchText,setSearchText] = useState("")

const [selectedStudentReport,setSelectedStudentReport] = useState(null)
const [loadingReport,setLoadingReport] = useState(false)
const [ get_score_data,set_score_data] = useState(null)
const [selectindex,setSelectedIndex] = useState(null)
let token = localStorage.getItem("token")

   const getStudentReport = async (item) => {

    if(!item.course_id || !item.class_id){
        alert("Please select course and class first")
        return
    }

    console.log("fetching report for ",item)

    try{
        setLoadingReport(true)

        const url = `${import.meta.env.VITE_DOMAIN}/hod/student/report?id=${item.id}&class_id=${item.class_id}&course_id=${item.course_id}`

        const res = await fetch(url,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })

        const data = await res.json()

        console.log("REPORT:",data)
        set_score_data(data)

        setSelectedStudentReport(data)

    }catch(err){
        console.log(err)
    }
    finally{
        setLoadingReport(false)
    }
}



  const read_classes = async () => {

        if (!selectedCourse) {
            console.log("course id not found ", selectedCourse)
            return false
        }
        try {
            const react = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/read/class/${selectedCourse}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await react.json()
            set_classes(data.data)
            console.log("classes for course", data)
        } catch (error) {
            return console.log(error)
        }
    }

 const searchStudents = async () => {
    try {

        console.log("searching students with ",{selectedCourse,selectedClass,searchText})
        const params = new URLSearchParams()

        if(selectedCourse){
            params.append("course", selectedCourse)
        }

        if(selectedClass){
            params.append("class", selectedClass)
        }

        if(searchText.trim() !== ""){
            params.append("search", searchText.trim())
        }

        const url = `${import.meta.env.VITE_DOMAIN}/hod/filter/student?${params.toString()}`


        const res = await fetch(url,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })

        const data = await res.json()
        setStudents(data.result)
console.log(" data of student",data.result)
    } catch(err){
        console.log(err)
    }
}




useEffect(()=>{
    const delay = setTimeout(()=>{
        searchStudents()
    },400)

    return ()=>clearTimeout(delay)

},[searchText,selectedCourse,selectedClass])


 useEffect(
        ()=>{
            set_courses(course)
            console.log("courses for student",course)

            searchStudents()
            console.log("data founded",get_courses)
        
        },[])

    useEffect(
        ()=>{
            read_classes()
            console.log("data founded",get_courses)},[course])

            useEffect(()=>{
                read_classes()
                console.log("selected course",selectedCourse)
            },[selectedCourse])
    return (

        <div className="w-full p-4 h-full overflow-y-hidden rounded-2xl  bg-white ">

<h1 className="text-gray-900 font-semibold my-1 text-xl">Search and see Student score</h1>

<div className="w-full h-full bg-white flex flex-col gap-3 py-3 rounded-2xl px-3 shadow ">

{/* search student inputs  */}
<div className="px-4 flex gap-5 py-2 bg-white h-fit rounded shadow ">

<label className="w-full rounded-2xl py-1" htmlFor="">
    <input
placeholder="search students"
className="w-full border-gray-100 border-2 py-2 rounded-xl px-3 bg-white"
type="search"
value={searchText}
onChange={(e)=>setSearchText(e.target.value)}
/>

</label>

<select onChange={(e)=>setSelectedCourse(e.target.value)} className=" rounded-xl p-2 bg-white shadow " name="course" id="">
<option value="">select course</option>
{
    get_courses.length&&get_courses.map((item,index)=>(
<option key={index}  value={item.id}>{item.name}</option>
    ))
}

</select>

<select     onChange={(e)=>setSelectedClass(e.target.value)}
 className=" rounded-xl p-2 bg-white shadow " name="course" id="">
    <option value="">select course</option>

{
    get_classes.length?get_classes.map((item,index)=>(
        <option key={index} value={item.id}>{item.class_name} {item.class_year}</option>
    )):<option>no class</option>
}

</select>

<Ok_button text={"Search"} onClick={searchStudents}/>
</div>

<div className="flex h-full overflow-y-auto flex-col gap-4 ">
{
students.length ?
students.map((item,index)=>(
<div key={index} className="flex rounded-2xl flex-col my-2 p-5 shadow gap-2 bg-white  h-fit" >
    <div className="flex justify-between items-center bg-white  rounded-2xl p-5 shadow-sm hover:shadow-md transition">

  {/* Left : Student Info */}
  <div className="flex flex-col gap-2">
    
    <p className="flex items-center gap-3 text-lg font-semibold text-gray-800">
      <LuUserRound className="text-orange-500 text-xl" />
      {item.name}
    </p>

    <p className="flex items-center gap-3 text-sm text-gray-500">
      <LuAtSign className="text-gray-400" />
      {item.email}
    </p>

    <p className="flex items-center gap-3 text-sm font-medium text-gray-600">
      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
      Roll No : {item.roll_no}
    </p>

  </div>

  {/* Right : Action Button */}
  <div>
    <Ok_button
    text={"View Report"}
      onClick={() =>{
    setSelectedIndex(index)
getStudentReport(item)

      } }
      className="
        px-5 py-2.5
        bg-gradient-to-r from-blue-500 to-blue-600
        hover:from-blue-600 hover:to-blue-700
        text-white font-medium
        rounded-xl shadow
        hover:shadow-lg
        active:scale-95
        transition-all duration-200
      "
    />
  </div>

</div>

   
{
selectindex === index && <div>

    {
loadingReport && <p className="text-blue-500">Loading Report...</p>
}
{
selectedStudentReport && (
<div className="p-6 bg-white rounded-3xl flex flex-col gap-6 mt-4 ">

  {/* Header */}
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold text-gray-800">
      Student Report : {selectedStudentReport.student.name}
    </h2>

    <button
      onClick={() => setSelectedStudentReport(null)}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow transition"
    >
      Close
    </button>
  </div>

  {/* Password */}
  <p className="flex items-center gap-2 text-sm text-gray-500">
    <LuLock className="text-gray-400" />
    {selectedStudentReport.student.password}
  </p>

  <hr />

  {/* Top Stats */}
  <div className="grid grid-cols-6 gap-6">

    {/* Overall Attendance Card */}
    <div className="col-span-2 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-6 flex flex-col items-center justify-center shadow">

      <CircleProgress
        value={get_score_data?.overall?.percentage ?? 0}
        size={110}
      />

      <h3 className="mt-4 text-lg font-semibold text-gray-700">
        Overall Attendance
      </h3>

      <p className="text-sm text-gray-500">
        {get_score_data?.overall?.present ?? 0} / {get_score_data?.overall?.total_lectures ?? 0} Lectures
      </p>

    </div>

    {/* Subject Cards */}
    <div className="col-span-4 grid grid-cols-2 gap-4">

      {get_score_data?.subjects?.length > 0 ? (
        get_score_data.subjects.map((sub, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
          >
            <CircleProgress value={sub.percentage ?? 0} size={65} />

            <div>
              <p className="font-semibold text-gray-800">{sub.subject}</p>
              <p className="text-sm text-gray-500">
                {sub.present ?? 0} / {sub.total_lectures ?? 0}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No subjects found</p>
      )}

    </div>
  </div>

  {/* Table */}
  <div className="bg-white rounded-3xl shadow overflow-hidden">

    <div className="px-6 py-4 border-b">
      <h3 className="font-semibold text-gray-700">Detailed Attendance</h3>
    </div>

    <table className="w-full">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="p-4 text-left">Subject</th>
          <th className="p-4 text-center">Total</th>
          <th className="p-4 text-center">Present</th>
          <th className="p-4 text-center">Percentage</th>
        </tr>
      </thead>

      <tbody>
        {get_score_data?.subjects?.length > 0 ? (
          get_score_data.subjects.map((sub, i) => (
            <tr key={i} className="border-t hover:bg-gray-50 transition">
              <td className="p-4 font-medium text-gray-700">{sub.subject}</td>
              <td className="p-4 text-center">{sub.total_lectures ?? 0}</td>
              <td className="p-4 text-center">{sub.present ?? 0}</td>
              <td className="p-4 text-center font-semibold text-blue-600">
                {sub.percentage ?? 0}%
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center p-8 text-gray-400">
              No Attendance Data Available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

</div>

)
}
</div>
}




</div>
))
:
<p>No Students Found</p>
}
</div>

</div>



        </div>

    )


}