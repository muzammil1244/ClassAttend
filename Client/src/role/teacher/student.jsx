import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CircleProgress from "../../component/circle_progress";
import { AddStudent } from "./add_student";

export const Student = ({ item  }) => {
  const [search, set_search] = useState("");
  const [students, set_students] = useState([]);
  const [scores, set_scores] = useState({}); // store score per student
  const [loadingId, set_loadingId] = useState(null);
const [open_add_student,set_add_student]=useState(false)
const[read_student,set_read_student] = useState(true)
const [update_data,set_update]= useState({})
  /* ---------------- FETCH STUDENTS ---------------- */

  const filter_student = async () => {
    try {
      const params = new URLSearchParams();

      if (item.course_id) params.append("course", item.course_id);
      if (item.class_id) params.append("class", item.class_id);
      if (search) params.append("search", search);

      const res = await fetch(
        `${import.meta.env.VITE_DOMAIN}/teacher/filter/student?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      set_students(data.result || []);
    } catch (error) {
      console.log(error);
    }
  };


  const delete_student =async(item)=>{
    try {
      let res = await fetch(`${import.meta.env.VITE_DOMAIN}/teacher/delete/student/${item.id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
    } catch (error) {
      return console.log(error)
    }
  }
  useEffect(() => {
    filter_student();
  }, [search]);

  /* ---------------- FETCH PARTICULAR STUDENT SCORE ---------------- */

  const student_report = async (stu) => {
    try {
      set_loadingId(stu.id);

      const res = await fetch(
        `${import.meta.env.VITE_DOMAIN}/teacher/student/score/${stu.id}/${item.subject_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      // save score per student
      set_scores((prev) => ({
        ...prev,
        [stu.id]: Math.round(data.percentage || 0),
      }));

      set_loadingId(null);
    } catch (error) {
      console.log(error);
      set_loadingId(null);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <>
     {read_student &&<div className="w-full h-full   bg-white ">
      {/* Header */}
      <div className="flex flex-col gap-3 mb-4">
        <h1 className="text-2xl font-semibold text-orange-500">
          Student Operations
        </h1>

        <div className="flex gap-3">
          <input
            type="search"
            placeholder="Search student..."
            className="border rounded-xl px-3 py-2 w-60"
            onChange={(e) => set_search(e.target.value)}
          />

          <button onClick={()=>{
            set_add_student(true)
            set_read_student(false)
          }} className="bg-orange-400 hover:bg-orange-500 text-white rounded-xl flex gap-2 px-4 py-2 items-center">
            <LuPlus /> Add
          </button>
        </div>
      </div>

      {/* Student Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {students.map((stu) => (
          <div
            key={stu.id}
            onClick={() => student_report(stu)}
            className="relative cursor-pointer bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition"
          >
            {/* Score Circle */}
            <div className="absolute top-3 right-3">
              {loadingId === stu.id ? (
                <p className="text-xs text-gray-400">Loading...</p>
              ) : scores[stu.id] !== undefined ? (
                <CircleProgress size={50} value={scores[stu.id]} />
              ) : null}
            </div>

            {/* Name */}
            <h2 className="text-xl font-semibold text-gray-800">
              {stu.name}
            </h2>

            {/* Roll */}
            <p className="text-gray-500 text-sm mt-2">
              Roll No : <span className="font-medium">{stu.roll_no}</span>
            </p>

            {/* Email */}
            <p className="text-gray-500 text-sm">
              Email : <span className="font-medium">{stu.email}</span>
            </p>

            {/* ID */}
            <p className="text-gray-400 text-xs mt-3">
              Student ID : {stu.id}
            </p>

            <div className="text-xs flex  justify-between text-blue-500 mt-3">
              Click to View Attendance % 
              
              <div className="flex gap-2 items-center justify-center ">
              <span onClick={()=>{
                set_add_student(true)
                set_read_student(false)
                set_update(stu)
              }} className=" text-orange-300 text-sm hover:decoration-1 decoration-dashed cursor-default hover:text-orange-500 duration-75 decoration-amber-300 ">update</span>
             <span className=" text-red-300 text-sm hover:decoration-1 decoration-dashed cursor-default hover:text-red-500 duration-75 decoration-amber-300 ">delete</span>
              </div>
              

          
          
          
            </div>
          </div>
        ))}
      </div>

      {/* Empty */}
      {students.length === 0 && (
        <div className="text-center text-gray-400 mt-10">
          No Students Found
        </div>
      )}
    </div>
    }
    {
      open_add_student && <div className="w-full h-full rounded-2xl shadow  bg-white ">
<AddStudent item={item} updateData={update_data}/>
      </div>
    }
    </>
   
    
  );
};