import { LuAtSign, LuBuilding2, LuLock, LuUserRound } from "react-icons/lu"
import Text_input from "../../component/inputfiled"
import Ok_button, { Cancel_button, Delete_button } from "../../component/buttons"
import { useState } from "react"
import { useEffect } from "react"

export const Create_Classes = ({class_data,setOpen_manage_class}) => {

   useEffect(()=>{
    console.log("class data in create class",class_data)
set_student_data((prev)=>({...prev,class_id:class_data.id}))
  setSelectedClass(class_data.id)
  set_class_data((prev)=>({...prev,name:class_data.class_name,year:class_data.class_year,course_id:class_data.course_id}))

   },[class_data])

    const [ get_course, set_course] = useState([])

const [ get_class_data,set_class_data] = useState({
    name:"",
    year: "",
    course_id:null
})
const [ get_student_data ,set_student_data] = useState({
email:'', password:"", name:"", roll_no:"", class_id :""

})
const [selectedClass,setSelectedClass] = useState( null)

const [get_student,set_student] = useState([])

const [get_teacher,set_teacher] = useState([])

const [get_subject,set_subject] = useState([])
// API fetching

let token = localStorage.getItem("token")
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
            set_course(data.data)
            console.log(data.data, "course list for ")


        } catch (error) {
            return console.log(error)
        }


    }

    const add_class=async(e)=>{
 e.preventDefault();

 if(!get_class_data.name || !get_class_data.year || !get_class_data.course_id){
    alert("all filed required")
}

try {
    
      
   let data =  await fetch(`${import.meta.env.VITE_DOMAIN}/hod/add/class/${get_class_data.course_id}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        class_name:get_class_data.name ,
        class_year:get_class_data.year
      })
    });

if(!data.ok){
    console.log("data not fetch properly")
}
  const result = await data.json(); // 🔥 YAHI MAIN CHEEZ HAI

  console.log("STATUS:", data.status); // 201
  set_student_data((prev)=>({...prev,class_id:result.data?.id}))
  setSelectedClass(result.data?.id)
  console.log("RESPONSE DATA:", result);} catch (error) {
    return console.log(error)
}



    }

    const add_student = async(e)=>{
         e.preventDefault();


        if(!get_student_data.class_id){
            alert("first you have to create class")
            return false
        }
try {
    let data =  await fetch(`${import.meta.env.VITE_DOMAIN}/hod/add/student`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify(get_student_data)
    });


if(!data.ok){
    console.log("data not fetch properly")
}

console.log(data.status)
searchStudents()


} catch (error) {
    return console.log(error)
}

    }

     const searchStudents = async () => {
    try {

       

        const url = `${import.meta.env.VITE_DOMAIN}/hod/student/${selectedClass}/data`


        const res = await fetch(url,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })

        const data = await res.json()
console.log(" data of student",data.result)
set_student(data.result)
console.log(" student",get_student)
    } catch(err){
        console.log(err)
    }
}

const read_teacher = async()=>{

    try {
        let url = `${import.meta.env.VITE_DOMAIN}/hod/read/teacher`
        const res = await fetch(url,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        const data = await res.json()
        console.log("data of teacher",data)
        set_teacher(data.data)

    } catch (error) {
        return console.log(error)
    }
}


const fetchSubjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/read/subject`, {
        method: "GET",
           headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
  
      })

      const data = await res.json()
      set_subject(data.data)
      console.log("data of subject",data.data)

    } catch (err) {
      console.log("Fetch error:", err)
    }
  }


useEffect(()=>{
    courses()
read_teacher()
fetchSubjects()
},[])
useEffect(() => {
    if(selectedClass){
        searchStudents()
    }
}, [selectedClass])

console.log("data of the all student ", get_student)

    return <div className=" w-full  bg-white p-5 overflow-y-scroll flex flex-col gap-5  h-full   rounded-2xl">
        {/* headers */}

       <div className="  shadow w-fit h-fit bg-gray-900  rounded-2xl ">
    <h2 className="text-sm font-semibold text-white px-4 py-2">Add OR Update classes </h2>
</div>

{/* create classes  */}

        <div className="w-full h-fit py-5 bg-white shadow rounded-2xl px-5">




<form className="flex flex-col gap-3" action="">

<label className="text-black  font-semibold "> Class Name </label>


<label className="flex items-center justify-center  gap-3" ><LuBuilding2/>
<input value={get_class_data.name} onChange={(e)=>set_class_data((prev)=>({...prev,name:e.target.value}))} className="w-full outline-orange-500 px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="text" placeholder="Class Name " name="class" />
</label>
<label className="flex items-center justify-center  gap-3" ><LuBuilding2/>
<input value={get_class_data.year}  onChange={(e)=>set_class_data((prev)=>({...prev,year:e.target.value}))} className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="number" placeholder="Year " name="year" />
</label>
<label className="flex items-center justify-center  gap-3" ><LuBuilding2/>
<select value={get_class_data.course_id}  onChange={(e)=>set_class_data((prev)=>({...prev,course_id:e.target.value}))} className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]">
<option>select course</option>
{
    get_course.length?get_course.map((item,index)=>(
        <option key={index} value={item.id}>{item.name}</option>
    )):<option>no course to select </option>
}

</select>

</label>

<Ok_button onClick={add_class} text={"Create"}/>
</form>

        </div>

{/* add students */}

        <div className=" w-ful flex shadow rounded-2xl flex-col gap-3   p-5 ">
<h1 className="font-semibold">
    Add Students
</h1>
<div className="flex w-ful gap-3 ">


     <div className="w-full h-80  bg-white shadow py-4 px-2 shadow rounded-2xl">

<form className="flex flex-col gap-3" action="">



<label className="flex items-center justify-center  gap-3" ><LuUserRound/>
<input onChange={(e)=>set_student_data((prev)=>({...prev,name:e.target.value}))} className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="text" placeholder="name " name="name" />
</label>
<label className="flex items-center justify-center  gap-3" ><LuAtSign/>
<input onChange={(e)=>set_student_data((prev)=>({...prev,email:e.target.value}))} className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="email" placeholder="email " name="email" />
</label><label className="flex items-center justify-center  gap-3" ><LuLock/>
<input onChange={(e)=>set_student_data((prev)=>({...prev,password:e.target.value}))} className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="password" placeholder="password " name="password" />
</label>
<label className="flex items-center justify-center  gap-3" ><LuBuilding2/>
<input onChange={(e)=>set_student_data((prev)=>({...prev,roll_no:e.target.value}))} className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="number" placeholder="Roll Number " name="roll_no" />
</label>



<Ok_button onClick={add_student} text={"Create"}/>
</form>
            </div>

             <div className="w-full flex flex-col gap-4 py-10 items-center overflow-y-scroll justify-center h-80  bg-white shadow rounded-2xl">
{
get_student.length === 0 ? (
    <p>No Students Found</p>
) : (
get_student.map((item) => (

<div key={item.id} className="w-full flex gap-5 flex-col bg-orange-100 p-4 rounded-2xl">

    <div className="flex flex-col gap-2">
        <h1 className="text-sm flex items-center gap-2">
            <LuUserRound /> {item.name}
        </h1>

        <h2 className="text-sm flex items-center gap-2">
            <LuAtSign /> {item.email}
        </h2>

        <h3 className="text-sm">
            Roll No : {item.roll_no}
        </h3>
    </div>

    <div className="flex gap-4">
        <Ok_button text={"Update"} />
        <Delete_button text={"Delete"} />
    </div>

</div>

))
)
}



            </div>
</div>
           

        </div>


        {/* add subjects and teachers to class */}

<div className="w-full flex flex-col gap-4 bg-white p-4 rounded-2xl shadow">
<h1 className="  ">Assign Teacher and Subject</h1>

<div className=" flex gap-4 justify-around items-center ">

{/* teacher list */}
<div className="p-2 w-[25%] bg-white flex h-fit flex-col gap-4 rounded-2xl shadow ">

<h1>teacher list</h1>

<div className="h-100  shadow-inner rounded-2xl p-2 flex flex-col gap-4 overflow-y-auto ">
{
get_teacher.length === 0 ? (
    <p>No teacher found</p>
):(
get_teacher.map((item)=>(
    <div key={item.id} className="w-full flex gap-5 flex-col bg-orange-100 p-4 rounded-2xl">
        <div className="flex flex-col gap-2">
            <h1 className="text-sm flex items-center gap-2">
                <LuUserRound /> {item.name}
            </h1>
            <h2 className="text-sm flex items-center gap-2">
                <LuAtSign /> {item.email}
            </h2>
        </div>
    </div>
)))
}
</div>
</div>

{/* main list to student and teacher */}

<div className="p-2 w-[50%] bg-white flex h-fit flex-col gap-4 rounded-2xl shadow  ">

<h1>assign teacher and subject to class</h1>

<div className="h-100 w-full  flex gap-2 rounded-2xl   ">
    <div className="w-full h-full bg-white shadow rounded-2xl ">

    </div>
    <div className="w-full bg-white shadow rounded-2xl h-full">

    </div>
</div>
</div>

{/* subjects */}
<div className=" p-2 w-[25%] bg-white flex h-fit flex-col gap-4 rounded-2xl shadow  ">
<h1>Subjects</h1>

<div className="h-100  shadow-inner rounded-2xl p-2 flex flex-col gap-4 overflow-y-auto  ">
{
    get_subject.length === 0 ? (
        <p>No subject found</p>
    ):( get_subject.map((item)=>(
        <div key={item.id} className="w-full flex gap-5 flex-col bg-orange-100 p-4 rounded-2xl">
            <div className="flex flex-col gap-2">   
                <h1 className="text-sm flex items-center gap-2">
                    <LuBuilding2 /> {item.subject}
                </h1>
            </div>
        </div>
    )))
}
</div>

</div>

</div>

<div className="w-full flex gap-3 items-center">
    <Ok_button text={"Submit"} />
    <Cancel_button  text={"Reset"} />
</div>
</div>






    </div>

}