import { SlPlus } from "react-icons/sl"
import Ok_button from "../../component/buttons"
import { LuBuilding, LuBuilding2, LuPlus, LuTimer } from "react-icons/lu"

export const Crud_classes = ()=>{

    return <div className="w-full rounded-2xl bg-white h-full ">
{/* header */}
<div className="w-full items-center py-3 px-10 flex justify-between bg-white shadow ">

<h1 className="w-fit font-bold  bg-white p-3 text-xl ">class list</h1>

<div className="bg-orange-500 rounded-xl hover:bg-orange-400 duration-100 cursor-pointer h-fit w-fit p-2">
    <LuPlus color="white" size={20}/>
</div>
</div>

<div className=" w-full px-10 ppy-5">

<div className="w-full bg-white shadow rounded-2xl">

<div>
    <h1 className="flex gap-4  items-center justify-center "><LuBuilding2/> BCA</h1>
    <h1><LuTimer/> 1</h1>
    <h1><LuBuilding/>BCA</h1>
</div>

</div>
</div>


    </div>
}