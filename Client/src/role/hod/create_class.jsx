import { LuAtSign, LuBuilding2, LuCross, LuLock, LuUserRound } from "react-icons/lu"
import Text_input from "../../component/inputfiled"
import Ok_button, { Cancel_button, Delete_button } from "../../component/buttons"
import { useState } from "react"
import { useEffect } from "react"
import { DndContext, DragOverlay, useDraggable, useDroppable } from "@dnd-kit/core";
import { DraggableTeacher } from "../../component/dragable"
import { DraggableSubject } from "../../component/dragaleSubject"
import { AssignDropZone } from "../../component/Assign"
import { RxCross1 } from "react-icons/rx";

export const Create_Classes = ({ class_data, setOpen_manage_class }) => {

    useEffect(() => {
        set_student_data((prev) => ({ ...prev, class_id: class_data.id }))
        setSelectedClass(class_data.id)
        set_class_data((prev) => ({ ...prev, name: class_data.class_name, year: class_data.class_year, course_id: class_data.course_id }))
   read_assigned(class_data.id)
   set_delete_subject_teacher_assign(true)
   set_delete_assign_id(class_data.id)
    }, [class_data])

// ////////////////////////////////////////////////////////////////////////////////////

    const [get_course, set_course] = useState([])

    const [get_class_data, set_class_data] = useState({
        name: "",
        year: "",
        course_id: null
    })
    const [get_student_data, set_student_data] = useState({
        email: '', password: "", name: "", roll_no: "", class_id: ""

    })
    const [selectedClass, setSelectedClass] = useState(null)

    const [get_student, set_student] = useState([])

    const [get_teacher, set_teacher] = useState([])

    const [get_subject, set_subject] = useState([])
    // Temporary selection (jab user drag kare)
    const [pendingAssign, setPendingAssign] = useState({
        teacher: null,
        subject: null,
    });

    // Final array (jo tum backend me bhejoge)
    const [finalAssign, setFinalAssign] = useState([]);
    const [activeItem, setActiveItem] = useState(null);
    const [acitve_delete_subject_teacher_assign,set_delete_subject_teacher_assign] = useState(false)
const [delete_assign_id,set_delete_assign_id] = useState(null)

const [update_active , set_update_active] = useState(false)
const [update_student_data , set_update_student_data] = useState(null)                                            
    // API fetching ////////////////////////////////////////////////////////////////////////////////////////////

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


        } catch (error) {
            return console.log(error)
        }


    }

    const add_class = async (e) => {
        e.preventDefault();

        if (!get_class_data.name || !get_class_data.year || !get_class_data.course_id) {
            alert("all filed required")
        }

        try {


            let data = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/add/class/${get_class_data.course_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    class_name: get_class_data.name,
                    class_year: get_class_data.year
                })
            });

            if (!data.ok) {
                console.log("data not fetch properly")
            }
            const result = await data.json(); // 🔥 YAHI MAIN CHEEZ HAI

            set_student_data((prev) => ({ ...prev, class_id: result.data?.id }))
            setSelectedClass(result.data?.id)
        } catch (error) {
            return console.log(error)
        }



    }

    const add_student = async (e) => {
        e.preventDefault();


        if (!get_student_data.class_id) {
            alert("first you have to create class")
            return false
        }
        console.log("data to send", get_student_data)
        try {
            let data = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/add/student`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(get_student_data)
            });


            if (!data.ok) {
                console.log("data not fetch properly")
            }
set_student_data({
    email: '', password: "", name: "", roll_no: "", class_id: get_student_data.class_id
})
            searchStudents()


        } catch (error) {
            return console.log(error)
        }

    }

    


    const searchStudents = async () => {
        try {



            const url = `${import.meta.env.VITE_DOMAIN}/hod/student/${selectedClass}/data`


            const res = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const data = await res.json()
            set_student(data.result)
        } catch (err) {
            console.log(err)
        }
    }

    const read_teacher = async () => {

        try {
            let url = `${import.meta.env.VITE_DOMAIN}/hod/read/teacher`
            const res = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await res.json()
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

        } catch (err) {
            console.log("Fetch error:", err)
        }
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over) {
            const data = active.data.current;

            if (data.type === "teacher") {
                setPendingAssign(prev => ({ ...prev, teacher: data.item }));
            }

            if (data.type === "subject") {
                setPendingAssign(prev => ({ ...prev, subject: data.item }));
            }
        }

        setActiveItem(null); // ✅ yahan reset hota hai
    };

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveItem(active.data.current);
    };

const read_assigned = async (class_id) => {

    try {
        const res = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/read/teacher/subject/${class_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await res.json()
setFinalAssign(data.data)
   } catch (err) {
        console.log("Fetch error:", err)
    }
}


const delete_subject_teacher_assign = async () => {

    if (!delete_assign_id) {
        alert("No class selected for deletion");
        return;
    }
    try {
        const res = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/delete/teacher/subject/${delete_assign_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        const data = await res.json()
        console.log("delete response", data)
        if (data.success) {
            alert("Previous assignments deleted. You can now add new assignments.");
            setFinalAssign([]);
        }
    } catch (error) {
        console.log("Error deleting assignments:", error);
    }
  
}

const delete_students = async (student_id) => {

    try {
        const res = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/delete/student/${student_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        const data = await res.json()
        console.log("delete response", data)
      
            searchStudents();
    } catch (error) {
        console.log("Error deleting student:", error);
    }
}

const   update_student_data_fun = async (e) => {
  e.preventDefault();  

  console.log("data to update", update_student_data)
  if (!update_student_data.name || !update_student_data.email || !update_student_data.password || !update_student_data.roll_no) {
    alert("all filed required")
    return false
  } 
  try {
    const res = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/update/student/${update_student_data.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(get_student_data)
    })
    const data = await res.json()
    console.log("update response", data)

    searchStudents()

    
  } catch (error) {
    return console.log("Error updating student:", error);
  }
}
 


/////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (pendingAssign.teacher && pendingAssign.subject) {

            const newPair = {
                teacher_id: pendingAssign.teacher.id,
                teacher_name: pendingAssign.teacher.name,
                subject_id: pendingAssign.subject.id,
                subject_name: pendingAssign.subject.subject,
            };

            setFinalAssign(prev => [...prev, newPair]);

            // reset for next selection
            setPendingAssign({ teacher: null, subject: null });
        }
    }, [pendingAssign]);


    const removeAssignedItem = (index) => {
        setFinalAssign(prev => prev.filter((_, i) => i !== index));
    }


    // Submit data ok

   const submit_assigned = async () => {

    if (finalAssign.length === 0) {
        alert("Add teacher and subjects");
        return;
    }

    const payload = finalAssign.map(item => ({
        class_id: selectedClass,
        teacher_id: item.teacher_id,
        subject_id: item.subject_id
    }));

    console.log("Sending payload:", payload);

    try {
        const response = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/add/teacher/subject`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
            console.log("Server error:", result);
            return;
        }

        console.log("Success:", result);

    } catch (error) {
        console.log("Fetch error:", error);
    }
};


    useEffect(() => {
        courses()
        read_teacher()
        fetchSubjects()
    }, [])
    useEffect(() => {
        if (selectedClass) {
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


                <label className="flex items-center justify-center  gap-3" ><LuBuilding2 />
                    <input value={get_class_data.name} onChange={(e) => set_class_data((prev) => ({ ...prev, name: e.target.value }))} className="w-full outline-orange-500 px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="text" placeholder="Class Name " name="class" />
                </label>
                <label className="flex items-center justify-center  gap-3" ><LuBuilding2 />
                    <input value={get_class_data.year} onChange={(e) => set_class_data((prev) => ({ ...prev, year: e.target.value }))} className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="number" placeholder="Year " name="year" />
                </label>
                <label className="flex items-center justify-center  gap-3" ><LuBuilding2 />
                    <select value={get_class_data.course_id} onChange={(e) => set_class_data((prev) => ({ ...prev, course_id: e.target.value }))} className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]">
                        <option>select course</option>
                        {
                            get_course.length ? get_course.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            )) : <option>no course to select </option>
                        }

                    </select>

                </label>

                <Ok_button onClick={add_class} text={"Create"} />
            </form>

        </div>

        {/* add students */}

        <div className=" w-ful flex shadow rounded-2xl flex-col gap-3   p-5 ">
            <h1 className="font-semibold">
                Add Students
            </h1>
            <div className="flex w-ful gap-3 ">


                <div className="w-full h-80  bg-white shadow py-4 px-2 shadow rounded-2xl">

                    <form className="flex flex-col gap-3" >



                        <label className="flex items-center justify-center  gap-3" ><LuUserRound />
                            <input value={get_student_data.name} onChange={(e) => set_student_data((prev) => ({ ...prev, name: e.target.value }))} className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="text" placeholder="name " name="name" />
                        </label>
                        <label className="flex items-center justify-center  gap-3" ><LuAtSign />
                            <input value={get_student_data.email} onChange={(e) => set_student_data((prev) => ({ ...prev, email: e.target.value }))} className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="email" placeholder="email " name="email" />
                        </label><label className="flex items-center justify-center  gap-3" ><LuLock />
                            <input value={get_student_data.password} onChange={(e) => set_student_data((prev) => ({ ...prev, password: e.target.value }))} className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="password" placeholder="password " name="password" />
                        </label>
                        <label className="flex items-center justify-center  gap-3" ><LuBuilding2 />
                            <input value={get_student_data.roll_no} onChange={(e) => set_student_data((prev) => ({ ...prev, roll_no: e.target.value }))} className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="number" placeholder="Roll Number " name="roll_no" />
                        </label>


{
    !update_active?
        <Ok_button onClick={add_student} text={"Create"} /> :
        <Ok_button onClick={update_student_data_fun} text={"Update"}/>
}
                    
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
                                        <Ok_button onClick={()=>{
                                            set_update_active(true)
                                            set_update_student_data(item)
                                              set_student_data((prev) => ({ ...prev, name:item.name , email:item.email, password:item.password,roll_no:item.roll_no,class_id:item.class_id}))

                                            }} text={"Update"} />
                                        <Delete_button onClick={()=>delete_students( item.id)} text={"Delete"} />
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
                <DndContext onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}>

                    {/* teacher list */}
                    <div className="p-2 w-[25%] overflow-x-visible bg-white flex h-fit flex-col gap-4 rounded-2xl shadow ">

                        <h1>teacher list</h1>

                        <div className="h-100  shadow-inner rounded-2xl p-2 flex flex-col gap-4 overflow-y-auto overflow-x-visible">
                            {
                                get_teacher.length === 0 ? (
                                    <p>No teacher found</p>
                                ) : (
                                    get_teacher.map((item) => (
                                        <DraggableTeacher key={item.id} item={item} />
                                    ))
                                )
                            }
                        </div>
                    </div>

                    {/* main list to student and teacher */}

                    <div className="flex w-full  flex-col gap-4">
                        <AssignDropZone />

                        <div className="h-100 gap-4 flex bg-white shadow rounded-2xl flex-col  w-full overflow-y-auto p-4">
                            {finalAssign.map((item, index) => (
                                <div key={index} className="w-full relative flex bg-white rounded-2xl shadow   gap-3 justify-between  p-2 rounded">

                                    <div onClick={() => removeAssignedItem(index)} className=" absolute top-2 right-2">
                                        <RxCross1 />
                                    </div>

                                    <div className="w-[50%] p-3 justify-center bg-blue-100   flex items-center  rounded-2xl">
                                        {item.teacher_name}
                                    </div>

                                    <div className="w-[50%] p-3 justify-center bg-blue-100  flex items-center rounded-2xl">
                                        {item.subject_name}
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>




                    {/* subjects */}
                    <div className=" p-2 w-[25%] bg-white flex h-fit flex-col gap-4 rounded-2xl shadow  ">
                        <h1>Subjects</h1>

                        <div className="h-100  shadow-inner rounded-2xl p-2 flex flex-col gap-4 overflow-y-auto overflow-x-visible  ">
                            {
                                get_subject.length === 0 ? (
                                    <p>No subject found</p>
                                ) : (get_subject.map((item) => (
                                    <DraggableSubject key={item.id} item={item} />
                                ))
                                )
                            }
                        </div>

                    </div>

                    <DragOverlay>
                        {activeItem ? (
                            <div className="bg-orange-200 p-4 rounded-2xl shadow-xl scale-105">
                                {activeItem.type === "teacher" && (
                                    <>
                                        <p>{activeItem.item.name}</p>
                                        <p className="text-sm">{activeItem.item.email}</p>
                                    </>
                                )}

                                {activeItem.type === "subject" && (
                                    <p>{activeItem.item.subject}</p>
                                )}
                            </div>
                        ) : null}
                    </DragOverlay>

                </DndContext>

            </div>

            <div className="w-full flex gap-3 items-center">
               {
                acitve_delete_subject_teacher_assign &&<Delete_button onClick={() => delete_subject_teacher_assign()} text={"DELETE"} />
                
             
               }    <Ok_button onClick={() => submit_assigned()} text={"Submit"} /> <Cancel_button onClick={() => setFinalAssign([])} text={"Reset"} />
            </div>
        </div>






    </div>

}