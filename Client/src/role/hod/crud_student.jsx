import { LuAtSign, LuIndentDecrease, LuLock, LuPhone, LuUserRound } from "react-icons/lu"
import Text_input from "../../component/inputfiled"
import { SlLock, SlPhone } from "react-icons/sl"
import Ok_button, { Cancel_button, Delete_button } from "../../component/buttons"

export const Crud_Student = () => {


    return (

        <div className="w-full p-4 h-full overflow-y-scroll rounded-2xl  bg-white ">

<h1 className="text-gray-900 font-semibold my-1 text-xl">Search and see Student score</h1>

<div className="w-full h-full bg-white py-3 rounded-2xl px-3 shadow ">

{/* search student inputs  */}
<div className="px-4 flex gap-5 py-2 bg-white rounded shadow ">

<label className="w-full rounded-2xl py-1" htmlFor=""><input placeholder="search students" className="w-full   border-gray-100 border-2 py-2 rounded-xl px-3 bg-white"  type="search" /></label>

<select className=" rounded-xl p-2 bg-white shadow " name="course" id="">
<option value="">course</option>

<option value="">bca</option>
<option value="">bcs</option>

</select>

<select className=" rounded-xl p-2 bg-white shadow " name="course" id="">
<option value="">class</option>

<option value="">bca</option>
<option value="">bcs</option>

</select>

<Ok_button text={"Search"}/>
</div>
</div>



        </div>

    )


}