import { useEffect, useState } from "react"

export const Create_att = (item)=>{

const [ get_student ,set_student] = useState([])
const [selectedStudents, setSelectedStudents] = useState([]);


    const read_students = async()=>{
        if(!item){
            return console.log("item not found ")
        }
      
        try {
            let response = await fetch(`${import.meta.env.VITE_DOMAIN}/teacher/read/student/${item.item.item.class_id}`,{
                method:"GET",
                headers:{
                     "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            
            let data = await response.json()
            if(!response.ok){
                console.log("data not found of student fr")
                return false
            }

            set_student(data.result)
        } catch (error) {
            return console.log(error)
        }
    }

    const handleSelect = (id) => {
    setSelectedStudents((prev) => {
        if (prev.includes(id)) {
            // remove if already selected
            return prev.filter((sid) => sid !== id);
        } else {
            // add if not selected
            return [...prev, id];
        }
    });
};


    useEffect(()=>{
        read_students()
    },[])
    console.log("student data",get_student)
    return(

        <div className="flex flex-col  justify-center items-center">

            {/* headers */}

            <div className="bg-orange-300 flex gap-10 p-5  rounded-2xl w-fit h-fit ">
                <div>
<h1 className="text-white text-xl">{item.item.item.subject}</h1>
<p className="  text-sm text-gray-100">{item.item.item.class_name}</p>



                </div>
                <div>
                    <h1> total : {get_student.length}</h1>
                    <h1> add : {selectedStudents.length} </h1>

                </div>
            </div>

            <div className="mt-6 w-full max-w-2xl space-y-3">
    {get_student.map((student) => (
        <div
            key={student.id}
            className="flex items-center justify-between bg-white shadow rounded-xl px-4 py-3"
        >
            {/* LEFT SIDE = CHECKBOX */}
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleSelect(student.id)}
                    className="w-5 h-5"
                />

                <div>
                    <h2 className="font-semibold text-gray-800">
                        {student.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Roll No: {student.roll_no}
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE = EMAIL */}
            <p className="text-sm text-gray-600">{student.email}</p>
        </div>
    ))}
</div>

        </div>
    )
}