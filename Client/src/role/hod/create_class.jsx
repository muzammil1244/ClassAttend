import { LuAtSign, LuBuilding2, LuLock, LuUserRound } from "react-icons/lu"
import Text_input from "../../component/inputfiled"
import Ok_button, { Delete_button } from "../../component/buttons"

export const Create_Classes = () => {

    return <div className=" w-full  bg-white p-5 overflow-y-scroll flex flex-col gap-5  h-full   rounded-2xl">
        {/* headers */}

       <div className="  shadow w-fit h-fit bg-gray-900  rounded-2xl ">
    <h2 className="text-sm font-semibold text-white px-4 py-2">Add OR Update classes </h2>
</div>

{/* create classes  */}

        <div className="w-full h-fit py-5 bg-white shadow rounded-2xl px-5">




<form className="flex flex-col gap-3" action="">

<label className="text-black  font-semibold "> Class Name </label>


<label className="flex items-center justify-center  gap-3" ><LuBuilding2/>
<input className="w-full outline-orange-500 px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="text" placeholder="Class Name " name="class" />
</label>
<label className="flex items-center justify-center  gap-3" ><LuBuilding2/>
<input className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="number" placeholder="Year " name="year" />
</label>
<label className="flex items-center justify-center  gap-3" ><LuBuilding2/>
<select className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]">

<option value="">bca</option>
<option value="">bca</option>
<option value="">bca</option>

</select>

</label>

<Ok_button text={"Create"}/>
</form>

        </div>

{/* add students */}

        <div className=" w-ful flex shadow rounded-2xl flex-col gap-3   p-5 ">
<h1 className="font-semibold">
    Add Students
</h1>
<div className="flex w-ful gap-3 ">


     <div className="w-full h-80  bg-white shadow py-4 px-2 shadow rounded-2xl">

<form className="flex flex-col gap-3" action="">



<label className="flex items-center justify-center  gap-3" ><LuUserRound/>
<input className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="text" placeholder="name " name="name" />
</label>
<label className="flex items-center justify-center  gap-3" ><LuAtSign/>
<input className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="email" placeholder="email " name="email" />
</label><label className="flex items-center justify-center  gap-3" ><LuLock/>
<input className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="password" placeholder="password " name="password" />
</label>
<label className="flex items-center justify-center  gap-3" ><LuBuilding2/>
<input className="w-full outline-orange-500  px-4 border-black border-[2px]  rounded-2xl p-[5px]" type="number" placeholder="Roll Number " name="roll_no" />
</label>

<select name="" id="">
    <option value=""></option>
</select>

<Ok_button text={"Create"}/>
</form>
            </div>

             <div className="w-full flex p-4 items-center overflow-y-scroll justify-center h-80  bg-white shadow rounded-2xl">

<div className="w-full flex gap-5 flex-col bg-orange-100 p-4 rounded-2xl">

    <div className=" flex w-full overflow-x-clip flex-col gap-2">
                                <h1 className="flex w-fit items-center justify-center gap-2 text-sm"><LuUserRound /> Muzammil Sir</h1>
                                <h2 className="flex w-fit items-center justify-center gap-2 text-sm"><LuAtSign /> muzammil@gmail.com</h2>
                                <h1 className="flex w-fit items-center justify-center gap-2 text-sm"><LuLock />  12345</h1>
                                <h1 className="flex w-fit items-center justify-center gap-2 text-sm">RollNo :  12345</h1>

                                <h2 className="flex w-fit items-center justify-center gap-2 text-sm">Gender:         Male </h2>


                            </div >
                            <div className="flex gap-4" >
                                <Ok_button text={"Update"}/>
                                <Delete_button text={"Delete"}/>
                            </div>
</div>

            </div>
</div>
           

        </div>


        {/* add subjects and teachers to class */}

<div className="w-full h- bg-white py-20 rounded-2xl shadow">
1
</div>






    </div>

}