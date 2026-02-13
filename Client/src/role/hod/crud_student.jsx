import { LuAtSign, LuIndentDecrease, LuLock, LuPhone, LuUserRound } from "react-icons/lu"
import Text_input from "../../component/inputfiled"
import { SlControlPause, SlLock, SlPhone } from "react-icons/sl"
import Ok_button, { Cancel_button, Delete_button } from "../../component/buttons"
import { useEffect, useState } from "react"

export const Crud_Student = ({course}) => {

const [get_courses,set_courses] = useState(course.length?course:[])
const [get_classes,set_classes] = useState([])


    useEffect(
        ()=>{console.log("data founded",get_courses)},[])

    let token = localStorage.getItem("token")

  const read_classes = async () => {
        if (get_courses.course > 0) {
            console.log("course id not found ", get_courses)
            return false
        }
        try {
            const react = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/read/class/${get_courses[0].id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await react.json()
            console.log("classes", data.data)
            set_classes(data.data)
        } catch (error) {
            return console.log(error)
        }
    }

    useEffect(
        ()=>{
            read_classes()
            console.log("data founded",get_courses)},[])
    return (

        <div className="w-full p-4 h-full overflow-y-scroll rounded-2xl  bg-white ">

<h1 className="text-gray-900 font-semibold my-1 text-xl">Search and see Student score</h1>

<div className="w-full h-full bg-white py-3 rounded-2xl px-3 shadow ">

{/* search student inputs  */}
<div className="px-4 flex gap-5 py-2 bg-white rounded shadow ">

<label className="w-full rounded-2xl py-1" htmlFor=""><input placeholder="search students" className="w-full   border-gray-100 border-2 py-2 rounded-xl px-3 bg-white"  type="search" /></label>

<select className=" rounded-xl p-2 bg-white shadow " name="course" id="">
{
    get_courses.length&&get_courses.map((item,index)=>(
<option key={index} value="">{item.name}</option>
    ))
}

</select>

<select className=" rounded-xl p-2 bg-white shadow " name="course" id="">
{
    get_classes.length?get_classes.map((item,index)=>(
        <option key={index} value="">{item.class_name} {item.class_year}</option>
    )):<option>no class</option>
}

</select>

<Ok_button text={"Search"}/>
</div>
</div>



        </div>

    )


}