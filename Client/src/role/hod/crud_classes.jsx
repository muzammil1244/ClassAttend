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
<div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-2xl">

{!open_manage_class && (
<div className="flex flex-col gap-6 h-full">

    <div className="bg-white/70 backdrop-blur-xl shadow-lg rounded-2xl px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">Class Management</h1>

        <div className="flex gap-4 items-center">

            <select
                onChange={(e)=> getClasses(e.target.value)}
                className="px-4 py-2 rounded-xl border bg-white focus:ring-2 ring-orange-400 outline-none"
            >
                <option value="">Select Course</option>
                {get_course.length
                    ? get_course.map((item)=>(
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))
                    : <option>No Course</option>
                }
            </select>

            <button
                onClick={()=>setOpen_manage_class(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-md transition-all"
            >
                <LuPlus size={20}/>
                Add Class
            </button>

        </div>
    </div>

    {/* ================= CLASS LIST ================= */}
    <div className="grid gap-5 overflow-y-auto pr-2">

        {classes.length === 0 && (
            <div className="bg-white rounded-xl p-6 text-center text-gray-400 shadow">
                No Classes Found — Select Course First
            </div>
        )}

        {classes.map((item)=>(
            <div
                key={item.id}
                className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition-all p-6 flex justify-between items-center"
            >

                {/* Class Info */}
                <div className="flex flex-col gap-3">

                    <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                        <LuBuilding2 className="text-orange-500"/>
                        {item.class_name}
                    </h2>

                    <p className="flex items-center gap-2 text-gray-500">
                        <LuTimer/>
                        Year : {item.class_year}
                    </p>

                    <p className="flex items-center gap-2 text-gray-500">
                        <LuBuilding/>
                        Course : {item.name}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 opacity-80 group-hover:opacity-100 transition">

                    <button
                        onClick={()=>handleUpdate(item)}
                        className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                        Update
                    </button>

                    <button
                        className="px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                    >
                        Delete
                    </button>

                </div>

            </div>
        ))}

    </div>
</div>
)}

{/* ================= CREATE / UPDATE SCREEN ================= */}
{
open_manage_class &&
<Create_Classes
    class_data={select_class_id}
    setOpen_manage_class={()=>setOpen_manage_class(false)}
/>
}

</div>
)

}
