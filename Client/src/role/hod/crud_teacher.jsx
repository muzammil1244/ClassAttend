import { LuAtSign, LuLock, LuPhone, LuUserRound } from "react-icons/lu"
import Text_input from "../../component/inputfiled"
import { SlLock, SlPhone } from "react-icons/sl"
import Ok_button, { Cancel_button, Delete_button } from "../../component/buttons"

export const Crud_teacher = () => {

    return (

        <div className="w-full h-full bg-amber-500 ">

            <div className="w-full h-full relative   bg-slate-100 gap-5 grid grid-cols-2">
<div className=" absolute top-5 left-5 ">
    <h2 className="text-xl font-semibold text-orange-400">Add OR Update teacher </h2>
</div>



                <div className="bg-white justify-center items-center flex w-full h-full rounded-2xl ">

                    <form className="flex flex-col gap-5" action="">

                        <Text_input placholder={"email"} name={"email"} type={"email"} lbname={"email"} lbval={<LuAtSign color="black" />} />
                        <Text_input placholder={"password"} name={"password"} type={"password"} lbname={"password"} lbval={<LuLock color="black" />} />
                        <Text_input placholder={"name"} name={"name"} type={"name"} lbname={"name"} lbval={<LuUserRound color="black" />} />

                        <Text_input placholder={"number"} name={"number"} type={"number"} lbname={"number"} lbval={<SlPhone color="black" />} />

                        <div className=" w-full flex gap-2 justify-around items-center h-full">
                            <label  className="text-black" htmlFor="">Gender </label>

                                <select className=" outline-orange-500 bg-white hover:bg-white border-1 rounded-xl p-2 text-center 
  font-semibold
    ">
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                    <option value="other">other</option>

                                </select>
                                
                                

                        </div>

<Ok_button text={"Add"} />

                    </form>

                </div>


                {/* teacher list  */}


                <div className="bg-white w-full flex flex-col gap-5 h-full p-5 rounded-2xl">

                    {/* Header */}
                    <div className="bg-white shadow w-full h-fit rounded-2xl p-4">
                        <h1 className=" text-xl font-semibold">
                            Teacher List
                        </h1>

                    </div>
                 <div className="w-full h-full overflow-y-auto bg-white  ">

<div className="w-full h-fit p-3 flex justify-between items-center bg-white shadow rounded-xl  ">

<div className=" flex w-full overflow-x-clip flex-col gap-2">
    <h1 className="flex w-fit items-center justify-center gap-2 text-sm"><LuUserRound/> Muzammil Sir</h1>
<h2 className="flex w-fit items-center justify-center gap-2 text-sm"><LuAtSign/> muzammil@gmail.com</h2>
 <h1 className="flex w-fit items-center justify-center gap-2 text-sm"><SlLock/>  12345</h1>
<h2 className="flex w-fit items-center justify-center gap-2 text-sm"><LuPhone/> 8446411038 </h2>
<h2 className="flex w-fit items-center justify-center gap-2 text-sm">Gender:         Male </h2>

</div >



{/* Buttons */}
<div className="h-full w-20  flex flex-col gap-2 ">
<Ok_button text={"Update"} />
<Delete_button text={"Delete"}/>
</div>
</div>
                 </div>
                </div>
            </div>



        </div>

    )

}