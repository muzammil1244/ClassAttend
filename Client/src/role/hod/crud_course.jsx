import { useEffect, useState } from "react";
import { LuAtSign, LuSearch } from "react-icons/lu";

import Text_input from "../../component/inputfiled";
import Ok_button, { Cancel_button, Delete_button } from "../../component/buttons";

export const Crud_course = ({course_data=[] , reload}) => {

    
  // ✅ Form State
  const [courseName, setCourseName] = useState("");

  // ✅ Course List
  const [courses, setCourses] = useState([]);

  // ✅ Update Mode
  const [editIndex, setEditIndex] = useState(null);

  // ✅ Search
  const [search, setSearch] = useState("");

  const [ filteredCourses , set_filteredCourses] = useState([])

useEffect(()=>{
    setCourses(course_data.coursecourses_datas)
   console.log("Course List",course_data.coursecourses_datas)
},[])


console.log(get)
//   API call



//   submit data 

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");  // 🔥 yahan lo

  if (!token) {
    console.log("No token found, login required");
    return;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/add/course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,   // 👈 MUST Bearer
      },
      body: JSON.stringify({ courseName }),
    });

    if (!response.ok) {
      console.log("data not pushed", response.status);
      return;
    }

    const data = await response.json();
    console.log("data submitted", data);

    setCourseName("");

  } catch (error) {
    console.log(error);
  }
};


  const handleDelete = (index) => {
    const filtered = courses.filter((_, i) => i !== index);
    setCourses(filtered);
  };

  const handleEdit = (index) => {
    setCourseName(courses[index]);
    setEditIndex(index);
  };
  
  useEffect(()=>{
const data = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase()))
set_filteredCourses(data)
  },[search])
    

  
  ;

  return (
    <div className="w-full h-full bg-slate-100">
      <div className="w-full h-full relative gap-5 grid grid-cols-2 p-5">
        {/* Title */}
        <div className="absolute top-5 left-5 bg-gray-900 rounded-2xl">
          <h2 className="text-sm font-semibold text-white px-4 py-2">
            {editIndex !== null ? "Update Course" : "Add Course"}
          </h2>
        </div>

        {/* ================= FORM ================= */}
        <div className="bg-white flex justify-center items-center rounded-2xl">
          <form
            className="flex flex-col bg-white shadow rounded-2xl p-5 gap-5 w-[80%]"
          >
            <Text_input
              placholder="Course Name"
              name="course"
              type="text"
              onChange={(value) => setCourseName(value)}
              lbname="course"
              lbval={<LuAtSign />}
            />

            <Ok_button onClick={handleSubmit} text={editIndex !== null ? "Update" : "Add"} />
          </form>
        </div>

        {/* ================= LIST ================= */}
        <div className="bg-white flex flex-col gap-5 h-full p-5 rounded-2xl">
          {/* Search Header */}
          <div className="flex gap-4 items-center shadow rounded-2xl p-4">
            <div className="bg-orange-100 p-2 rounded-xl">
              <LuSearch size={25} />
            </div>

            <input
              placeholder="Search Course"
              className="w-full border outline-orange-500 border-gray-400 py-2 rounded-xl px-3"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Course List */}
          <div className="w-full h-full overflow-y-auto flex flex-col gap-4">
            {filteredCourses.length === 0 && (
              <p className="text-center text-gray-400">No Course Found</p>
            )}

            {filteredCourses.map((course, index) => (
              <div
                key={index}
                className="w-full p-3 flex justify-between items-center bg-white shadow rounded-xl"
              >
                <h2 className="text-sm font-semibold">{course.name}</h2>

                {/* Buttons */}
                <div className="flex flex-col gap-2">
                  <div onClick={() => handleEdit(index)}>
                    <Cancel_button text="Update" />
                  </div>

                  <div onClick={() => handleDelete(index)}>
                    <Delete_button text="Delete" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
