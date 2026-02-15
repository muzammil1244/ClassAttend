import { useEffect, useState } from "react"
import { LuBuilding, LuBuilding2, LuDelete, LuPlus, LuTimer, LuTrash } from "react-icons/lu"
import Ok_button, { Delete_button } from "../../component/buttons"
import { useNavigate } from "react-router-dom"
import { Create_Classes } from "./create_class"

export const Crud_classes = () => {

    const [classes, setClasses] = useState([])
    const [ get_course ,set_course] = useState([])
    const [open_manage_class,setOpen_manage_class] = useState(false)
const [select_class_id,setSelect_class_id] = useState({})
  const getClasses = async (course_id) => {

    
    if(!course_id){

        return alert("select course first ")
    }

    try {
        let url = `${import.meta.env.VITE_DOMAIN}/hod/read/class/${course_id}`

        // ✅ agar course select hua hai to filter lagao
     

        const res = await fetch(url, {
            method: "GET",
 headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }       })

        const data = await res.json()
        console.log("Classes:", data)

        if (res.ok) {
            setClasses(data.data)
        }

    } catch (error) {
        console.log("Fetch error:", error)
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
            console.log("course list ",data.data)
            set_course(data.data)

        } catch (error) {
            return console.log(error)
        }


    }

    const handleUpdate = (class_data) => {
       setOpen_manage_class(true)
       setSelect_class_id(class_data)

    }

    useEffect(() => {
        courses()

    }, [])

    useEffect(()=>{


    },[])
return (
<div className="w-full rounded-2xl bg-gray-100 h-full">
{!open_manage_class &&<div>
    {/* Header */}
<div className="w-full items-center py-4 px-10 flex justify-between bg-white shadow">
    <h1 className="font-bold text-2xl">Class List</h1>

<div className="flex gap-5 items-center ">

    <select
onChange={(e)=>{
    getClasses(e.target.value)   // now passing id directly
}}
className="bg-white shadow rounded-2xl p-3"
>
<option value="">All Courses</option>

{
get_course.length
? get_course.map((item)=>(
    <option key={item.id} value={item.id}>
        {item.name}
    </option>
))
: <option>no course</option>
}
</select>



    <div onClick={()=>setOpen_manage_class(true)} className="bg-orange-500 rounded-xl hover:bg-orange-400 duration-150 cursor-pointer p-3 shadow">
      
       
        <LuPlus color="white" size={22}/>
    </div>
</div>
    
</div>


{/* Body */}
<div className="w-full px-10 py-6 grid grid-cols-1 gap-6">

{classes.length === 0 && (
    <p className="text-gray-500">No Classes Found</p>
)}

{classes.map((item) => (
<div key={item.id} className="bg-white flex  rounded-2xl shadow hover:shadow-xl duration-200 p-6 w-full justify-between gap-4 ">

<div className="flex flex-col gap-3 ">
    <div className="flex items-center gap-3 text-lg font-semibold">
        <LuBuilding2 className="text-orange-500"/>
        {item.class_name}
    </div>

    <div className="flex items-center gap-3 text-gray-600">
        <LuTimer/>
        Semester : {item.class_year}
    </div>

    <div className="flex items-center gap-3 text-gray-600">
        <LuBuilding/>
         : {item.name}
    </div>
</div>

<div className="flex flex-col gap-3">
    <Ok_button onClick={()=>handleUpdate(item)} text={"Update"}/>
    <Delete_button text={"Delete"}/>
</div>
    

</div>
))}

</div>
</div> }


{
    open_manage_class && <Create_Classes class_data={select_class_id} setOpen_manage_class={()=>setOpen_manage_class(false) } />
}
</div>
)
}
