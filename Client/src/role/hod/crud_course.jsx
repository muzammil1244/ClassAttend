import { useEffect, useState } from "react";
import { LuAtSign, LuSearch, LuBookOpen } from "react-icons/lu";

import Text_input from "../../component/inputfiled";
import Ok_button, { Cancel_button, Delete_button } from "../../component/buttons";
import { Confirm_message } from "../../component/message";
import { useNavigate } from "react-router-dom";

export const Crud_course = ({ course_data, reload }) => {
    let navigate = useNavigate()

  useEffect(()=>{
let token = localStorage.getItem("token")
if(!token){
navigate("/login")
}
},[])
  const [courseName, setCourseName] = useState("");
  const [courses, setCourses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [delete_course_id ,set_delete_course_id]=useState(null)
const [ open_al_message,set_open_al_message] = useState(false)
  useEffect(() => {
    setCourses(course_data);
  }, [course_data]);

  const filteredCourses = courses.filter((course) =>
    course?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      let url = `${import.meta.env.VITE_DOMAIN}/hod/add/course`;
      let method = "POST";

      if (editIndex !== null) {
        const courseId = courses[editIndex].id;
        url = `${import.meta.env.VITE_DOMAIN}/hod/update/course/${courseId}`;
        method = "PATCH";
      }

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ course_name: courseName }),
      });

      setCourseName("");
      setEditIndex(null);
      reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (index) => {
    setCourseName(courses[index].name);
    setEditIndex(index);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    await fetch(`${import.meta.env.VITE_DOMAIN}/hod/delete/course/${delete_course_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    reload();
    set_open_al_message(false)
  };

  return (
  <div className="w-full h-full bg-slate-100 p-6">
    <div className="grid grid-cols-2 gap-6 h-full">

      {/* ================= LEFT FORM ================= */}
      <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col justify-center">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8 border-b pb-4">
          <div className="bg-orange-100 p-3 rounded-xl">
            <LuBookOpen size={22} className="text-orange-500" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              {editIndex !== null ? "Update Course" : "Add New Course"}
            </h2>
            <p className="text-sm text-gray-400">
              Manage courses from here
            </p>
          </div>
        </div>

        {/* Input */}
        <form className="flex flex-col gap-6">
          <div className="relative">
            <input
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter Course Name..."
              className="w-full border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition px-12 py-3 rounded-xl outline-none"
            />
            <LuAtSign className="absolute left-4 top-3.5 text-gray-400" size={18} />
          </div>

          <button
            onClick={handleSubmit}
            className={`py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm
              ${editIndex !== null
                ? "bg-white-400 hover:bg-gray-50 text-gray-900 cursor-pointer"
                : "bg-white-400 hover:bg-gray-50 text-gray-900 cursor-pointer"
              }`}
          >
            {editIndex !== null ? "Update Course" : "Add Course"}
          </button>
        </form>
      </div>

      {/* ================= RIGHT LIST ================= */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-full">

        {/* Search */}
        <div className="relative mb-6">
          <LuSearch className="absolute left-4 top-3 text-gray-400" size={18} />
          <input
            placeholder="Search Course..."
            className="w-full border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition pl-10 py-3 rounded-xl outline-none"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* List */}
        <div className="flex flex-col gap-3 overflow-y-auto pr-2">
          {filteredCourses.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              No Course Found
            </div>
          )}

          {filteredCourses.map((course, index) => (
            <div
              key={index}
              className="group flex justify-between items-center p-4 rounded-xl border border-gray-100 hover:border-orange-300 hover:bg-orange-50 transition-all"
            >
              <h2 className="font-medium text-gray-700">
                {course.name}
              </h2>

              <div className="flex gap-3 opacity-70 group-hover:opacity-100">
                <button
                  onClick={() => handleEdit(index)}
                  className="px-4 py-1.5 text-sm rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                >
                  Update
                </button>

                <button
                  onClick={() => {
                    set_open_al_message(true)
                    set_delete_course_id(course.id)}}
                  className="px-4 py-1.5 text-sm rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>

     {
          open_al_message && 
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          
              <div className="animate-scaleIn">
                <Confirm_message
                cancel={()=>set_open_al_message(false)}
                ok={()=>handleDelete()}
                  heading={"Delete course"}
                  message={"Are you sure you want to delete this student?"}
                  onCancel={() => set_open_al_message(false)}
                  onConfirm={() => {
                    set_open_al_message(false);
                  }}
                />
              </div>
          
            </div>
        }
  </div>
);
};
