
import { LuAtSign, LuSearch, LuBookOpen, LuDownload, LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";


export const Read_att = ({item,onclick,onDownload }) => {
        let navigate = useNavigate()

useEffect(()=>{
let token = localStorage.getItem("token")
if(!token){
navigate("/login")
}
},[])
    console.log(item)


    return (

        <div className="flex  flex-col gap-4 bg-white">
{/* headers */}
<div className=" bg-white shadow flex justify-between items-center p-4 rounded-2xl ">

    <h1>
        <LuArrowLeft onClick={()=>onclick()}/>
    Read Attendance
    </h1>

    <div
    onClick={onDownload}
    className="flex gap-3 hover:scale-105 duration-75 p-3 cursor-pointer justify-center items-center rounded-2xl shadow "
>
    <LuDownload/>
    <h1>Download</h1>
</div>
    
</div>

 <div className="bg-white rounded-2xl shadow p-6">

    <table className="w-full border-collapse">

        {/* Table Head */}
        <thead>
            <tr className="border-b text-left">
                <th className="p-3 text-black">Date</th>
                <th className="p-3 text-black">Student Name</th>
                <th className="p-3 text-black">Roll No</th>
                <th className="p-3 text-black">Status</th>
            </tr>
        </thead>

        {/* Table Body */}
        <tbody>
            {item?.map((stu, index) => {

                const formattedDate = new Date(stu.att_date)
                    .toLocaleDateString("en-GB");

                return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-black">{formattedDate}</td>
                        <td className="p-3 text-black">{stu.name}</td>
                        <td className="p-3 text-black">{stu.roll_no}</td>

                        <td className="p-3 font-semibold">
                            {stu.status === "P" ? (
                                <span className="text-green-600">Present</span>
                            ) : (
                                <span className="text-red-600">Absent</span>
                            )}
                        </td>
                    </tr>
                );
            })}
        </tbody>

    </table>

    {item?.length === 0 && (
        <div className="text-center text-black py-10">
            No Attendance Found
        </div>
    )}

</div>


        </div>
    )
}
