import { useEffect, useState } from "react"
import { LuSearch } from "react-icons/lu"

import Text_input from "../../component/inputfiled"
import Ok_button, { Delete_button } from "../../component/buttons"


export const Crud_subjects = () => {

  const [subjects, setSubjects] = useState([])
  const [subName, setSubName] = useState("")
  const [search, setSearch] = useState("")


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
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/delete/subject/${id}`, {
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
    <div className="w-full h-full bg-amber-500">

      <div className="w-full h-full relative bg-slate-100 gap-5 grid grid-cols-2">

        {/* TITLE */}
        <div className="absolute top-5 left-4 w-fit h-fit bg-gray-900 rounded-2xl">
          <h2 className="text-sm font-semibold text-white px-4 py-2">
            Add OR Update Subjects
          </h2>
        </div>

        {/* ADD FORM */}
        <div className="bg-white justify-center items-center flex w-full h-full rounded-2xl">

          <form
            onSubmit={handleAdd}
            className="flex flex-col bg-white shadow rounded-2xl p-5 gap-5"
          >
            <Text_input
              placholder={"Subject Name"}
              name={"subjects"}
              type={"text"}
              lbname={"subject"}
              onChange={(value) => setSubName(value)}
            />

            <Ok_button text={"Add"} />
          </form>
        </div>

        {/* SUBJECT LIST */}
        <div className="bg-white w-full flex flex-col gap-5 h-full p-5 rounded-2xl">

          {/* SEARCH */}
          <div className="flex gap-4 items-center shadow w-full rounded-2xl p-4">
            <div className="shadow p-2 rounded-xl">
              <LuSearch size={30} />
            </div>

            <input
              placeholder="Search Subject"
              className="w-full border-2 outline-orange-500 border-gray-700 py-2 rounded-xl px-3"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* LIST */}
          <div className="w-full h-full overflow-y-auto flex flex-col gap-3">

            {filteredSubjects.length === 0 && (
              <p className="text-center text-gray-500">No Subject Found</p>
            )}

            {filteredSubjects.map((item) => (
              <div
                key={item.id}
                className="p-3 flex justify-between items-center bg-white shadow rounded-xl"
              >
                <h2 className="text-sm font-semibold">{item.subject}</h2>

                <Delete_button
                  text={"Delete"}
                  onClick={() => handleDelete(item.id)}
                />
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}
