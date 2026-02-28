import { useEffect, useState } from "react"
import { LuSearch } from "react-icons/lu"

import Text_input from "../../component/inputfiled"
import Ok_button, { Delete_button } from "../../component/buttons"
import { Confirm_message } from "../../component/message"
import { useNavigate } from "react-router-dom"


export const Crud_subjects = () => {
      let navigate = useNavigate()

useEffect(()=>{
let token = localStorage.getItem("token")
if(!token){
navigate("/login")
}
},[])
  const [subjects, setSubjects] = useState([])
  const [subName, setSubName] = useState("")
  const [search, setSearch] = useState("")
  const [delete_id ,set_delete_id] = useState(null)
const [ open_message,set_open_message] = useState(false)

  const token = localStorage.getItem("token")
  // ✅ READ SUBJECTS
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
      setSubjects(data.data)

    } catch (err) {
      console.log("Fetch error:", err)
    }
  }

  useEffect(() => {
    fetchSubjects()
  }, [])

  // ✅ ADD SUBJECT
  const handleAdd = async (e) => {
    e.preventDefault()

    if (!subName.trim()) return alert("Enter subject name")

    try {
      const res = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/add/subject`, {
        method: "POST",
         headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sub_name: subName })
      })

      const data = await res.json()

      if (res.ok) {
        setSubName("")
        fetchSubjects() // refresh list
      } else {
        alert(data.message)
      }

    } catch (err) {
      console.log("Add error:", err)
    }
  }

  // ✅ DELETE SUBJECT
  const handleDelete = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/delete/subject/${delete_id}`, {
        method: "DELETE",
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        fetchSubjects()
      }

    } catch (err) {
      console.log("Delete error:", err)
    }
  }

  // ✅ SEARCH FILTER
  const filteredSubjects = subjects.filter((item) =>
    item.subject.toLowerCase().includes(search.toLowerCase())
  )

  return (
   <div className="w-full h-full overflow-hidden bg-slate-100 p-6">

  <div className="w-full h-full relative grid grid-cols-2 gap-6">

    {/* ===== TITLE BADGE ===== */}
    <div className="absolute -top-3 left-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white px-5 py-2 rounded-xl shadow">
      <h2 className="text-sm font-semibold tracking-wide">
        Add / Manage Subjects
      </h2>
    </div>


    {/* ================= ADD SUBJECT FORM ================= */}
    <div className="bg-white flex justify-center items-center rounded-2xl shadow-lg">

      <form
        onSubmit={handleAdd}
        className="w-[80%] max-w-md flex flex-col gap-6 p-8"
      >
        <h3 className="text-xl font-bold text-gray-700 border-b pb-3">
          Add New Subject
        </h3>

        <Text_input
          placholder={"Subject Name"}
          name={"subjects"}
          type={"text"}
          lbname={"subject"}
          onChange={(value) => setSubName(value)}
        />

        <Ok_button text={"Add Subject"} />
      </form>

    </div>


    {/* ================= SUBJECT LIST ================= */}
    <div className="bg-white flex flex-col rounded-2xl overflow-hidden shadow-lg p-6">

      {/* SEARCH BAR */}
      <div className="flex items-center gap-3 border rounded-xl  px-4 py-3 focus-within:ring-2 ring-orange-400">
        <LuSearch className="text-gray-400" size={22}/>
        <input
          placeholder="Search Subject..."
          className="w-full outline-none"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>


      {/* LIST */}
      <div className="mt-6 flex flex-col gap-3 overflow-y-auto pr-2">

        {filteredSubjects.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No Subject Found
          </div>
        )}

        {filteredSubjects.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-gray-200 border items-center bg-slate-50 hover:bg-orange-50 transition-all hover:border-orange-400 bg-white rounded-xl px-4 py-3"
          >
            <h2 className="font-semibold text-gray-700">
              {item.subject}
            </h2>

            <Delete_button
              text={"Delete"}
              onClick={() =>{
                
               set_delete_id(item.id)
               set_open_message(true)
              }}
            />
          </div>
        ))}

      </div>
    </div>

  </div>

     {
            open_message && 
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            
                <div className="animate-scaleIn">
                  <Confirm_message
                  cancel={()=>set_open_message(false)}
                  ok={()=>handleDelete()}
                    heading={"Delete subject"}
                    message={"Are you sure you want to delete this subject?"}
                    onCancel={() => set_open_message(false)}
                    onConfirm={() => {
                      set_open_message(false);
                    }}
                  />
                </div>
            
              </div>
          }
</div>

  )
}
