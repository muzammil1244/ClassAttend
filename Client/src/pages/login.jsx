import Ok_button from "../component/buttons";
import Text_input from "../component/inputfiled"
import { LuAtSign, LuBuilding, LuLock, LuUser, LuUserRound } from "react-icons/lu";

export const Loging = () => {
    return(
    <div className="bg-white w-screen h-screen flex justify-center items-center">
    <h1 className=" absolute top-10 text-4xl font-bold text-gray-800 "> <span className="  animate-pulse text-orange-500">Class</span>Attend</h1>

<div  className="w-fit  p-5 gap-3 flex flex-row justify-around h-fit rounded-2xl  shadow-gray-500 shadow">
    {/* for inputs */}
<div className="bg-gray-800 h-full p-10 w-full flex justify-center items-center overflow-hidden rounded-2xl">

<form className="" onSubmit={""}>
<div className=" w-full flex gap-2 justify-around items-center h-full">
<LuUserRound className="text-white"/>
<select    className=" outline-orange-500 w-full bg-white hover:bg-white border-1 rounded-xl p-2 text-center 
  font-semibold
    " name="Role" id="role">

<option value="hod">HOD</option>
<option value="teacher">teacher</option>
<option value="student">student</option>

</select>
</div>
{/* for hod and teacher  */}
<div>
    <Text_input placholder={"email"} name={"email"} type={"email"} lbname={"email"} lbval={<LuAtSign />} />
    <Text_input placholder={"password"} name={"password"} type={"password"} lbname={"password"} lbval={<LuLock />} />

</div>
<Ok_button text={"Login"}/>
</form>

</div>

{/* for descriptions */}
 <div className="bg-orange-400 rounded-2xl ">

</div>
</div>

    </div>
    )
}   

