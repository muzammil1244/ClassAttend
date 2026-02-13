import { useEffect, useState } from "react";
import { LuAtSign, LuSearch } from "react-icons/lu";

import Text_input from "../../component/inputfiled";
import Ok_button, { Cancel_button, Delete_button } from "../../component/buttons";

export const Crud_course = ({course_data , reload}) => {

    
   const [courseName, setCourseName] = useState("");
  const [courses, setCourses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCourses(course_data);
  }, [course_data]);
console.log("Curses" , )
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

  const handleDelete = async (index) => {
    const token = localStorage.getItem("token");
    const courseId = courses[index].id;

    await fetch(`${import.meta.env.VITE_DOMAIN}/hod/delete/course/${courseId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    reload();
  };
  
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
          <div className="w-full h-95 overflow-y-scroll flex flex-col gap-4">
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
