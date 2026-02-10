import { LuAtSign, LuLock, LuPhone, LuSearch, LuSearchCode, LuTextSearch, LuUserRound } from "react-icons/lu"
import Text_input from "../../component/inputfiled"
import { SlLock, SlPhone } from "react-icons/sl"
import Ok_button, { Cancel_button, Delete_button } from "../../component/buttons"
export const Crud_subjects = () =>{

  return (

        <div className="w-full h-full bg-amber-500 ">

            <div className="w-full h-full relative   bg-slate-100 gap-5 grid grid-cols-2">
 <div className="  absolute top-5 left-4  w-fit h-fit bg-gray-900  rounded-2xl ">
    <h2 className="text-sm font-semibold text-white px-4 py-2">Add OR Update classes </h2>
</div>



                <div className="bg-white justify-center items-center flex w-full h-full rounded-2xl ">

                    <form className="flex flex-col bg-white shadow rounded-2xl p-5 gap-5" action="">

                        <Text_input placholder={"Subject Name"} name={"subjects"} type={"text"} lbname={"subject"} lbval={<LuAtSign color="black" />} />
                        <div className=" w-full flex gap-2 justify-around items-center h-full">

                                
                                

                        </div>

<Ok_button text={"Add"} />

                    </form>

                </div>


                {/* teacher list  */}


                <div className="bg-white w-full flex flex-col gap-5 h-full p-5 rounded-2xl">

                    {/* Header */}
                    <div className="bg-white flex gap-4 items-center justify-center shadow w-full h-fit rounded-2xl p-4">
                    
                    <div className="bg-white shadow p-2 rounded-xl">
                                             <LuSearch  size={30}/>

                    </div>
                    
                        <input placeholder="Search Subject" className="w-full border-2 border outline-orange-500 border-gray-700 py-2 rounded-xl px-3" type="search" />

                    </div>
                 <div className="w-full h-full overflow-y-auto bg-white  ">

<div className="w-full h-fit p-3 flex justify-between items-center bg-white shadow rounded-xl  ">

<div className=" flex w-full overflow-x-clip flex-col gap-2">
    
<h2 className="flex w-fit items-center justify-center gap-2 text-sm">Match</h2>

</div >



{/* Buttons */}
<div className="h-full w-20  flex flex-col gap-2 ">
<Delete_button text={"Delete"}/>
</div>
</div>
                 </div>
                </div>
            </div>



        </div>

    )
}