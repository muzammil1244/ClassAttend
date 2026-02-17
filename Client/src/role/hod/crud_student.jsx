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

let token = localStorage.getItem("token")

   const getStudentReport = async (item) => {

    if(!item.course_id || !item.class_id){
        alert("Please select course and class first")
        return
    }

    console.log("fetching report for ",item)

    try{
        setLoadingReport(true)

        const url = `${import.meta.env.VITE_DOMAIN}/hod/student/report?id=${item.student_id}&class_id=${item.class_id}&course_id=${item.course_id}`

        const res = await fetch(url,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })

        const data = await res.json()

        console.log("REPORT:",data)

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
<div key={index} className="flex rounded-2xl flex-col my-2 p-5 shadow-xl gap-2 bg-white  h-fit" >
    <div className="  flex justify-between      ">
         <div>
        <p className=" font-bold flex gap-3 items-center  "> <LuUserRound/> {item.name}</p>
<p className=" font-bold  flex gap-3 items-center  "><LuAtSign/>{item.email}</p>
<p className=" font-bold   flex gap-3 items-center  "> Roll No {item.roll_no}</p>

    </div>

<div>
<button
className="px-4 py-2 bg-blue-500 text-white rounded-xl"
onClick={()=>getStudentReport(item)}
>
View Report
</button>

</div>
    </div>
   

{
loadingReport && <p className="text-blue-500">Loading Report...</p>
}

{
selectedStudentReport && (
<div className=" p-6 rounded-2xl  mt-4">

<h2 className="text-xl font-bold mb-3">
Student Report : {selectedStudentReport.student.name}
</h2>

<p className="flex gap-3 items-center "><b><LuLock/></b> {selectedStudentReport.student.password}</p>

<hr className="my-3"/>


<div className=" justify-between overflow-hidden grid grid-cols-6 w-full h-fit">

    <div className="w-fit col-span-2  bg-orange-100 flex gap-3 flex-col p-4 rounded-2xl justify-center items-center">

         <CircleProgress value={50} size={100}/>
<h3 className="font-semibold text-lg">Overall Attendance</h3>



    </div>

    <div className= "w-full p-4 col-span-4 gap-4 bg-green-200 grid grid-cols-3  ">

<div>
    <CircleProgress value={50} size={60}/>
    <p>android</p>
</div>
<div>
    <CircleProgress value={50} size={60}/>
    <p>android</p>
</div><div>
    <CircleProgress value={50} size={60}/>
    <p>android</p>
</div><div>
    <CircleProgress value={50} size={60}/>
    <p>android</p>
</div><div>
    <CircleProgress value={50} size={60}/>
    <p>android</p>
</div> <div>
    <CircleProgress value={50} size={60}/>
    <p>android</p>
</div><div>
    <CircleProgress value={50} size={60}/>
    <p>android</p>
</div><div>
    <CircleProgress value={50} size={60}/>
    <p>android</p>
</div><div>
    <CircleProgress value={50} size={60}/>
    <p>android</p>
</div><div>
    <CircleProgress value={50} size={60}/>
    <p>android</p>
</div><div>
    <CircleProgress value={50} size={60}/>
    <p>android</p>
</div>
    </div>
</div>




<button
className="mt-4 px-4 py-2 bg-red-400 text-white rounded"
onClick={()=>setSelectedStudentReport(null)}
>
Close
</button>

</div>
)
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