import { SlClose } from "react-icons/sl";



export const Succes_Message = ({heading,message,cancel})=>{


return (
    <div className=" w-screen h-screen bg-black/30 backdrop-blur-xl flex justify-center items-center">

             
        <div className=" w-[40%] relative h-fit bg-white rounded-md p-4 flex flex-col justify-center items-center gap-4">
            <SlClose className=" absolute top-2 left-2 cursor-pointer hover:scale-110 duration-75 " onClick={()=>
                {
                    cancel()
                location.reload()
                }
                   
                
                }/>
            <h2 className="text-xl font-bold text-green-400">{heading}</h2>
        <p className="text-sm font-medium"  >{message}</p> 
        </div>
       
    </div>
);

}

 export const Failure_Message = ({heading,message,ok})=>{ 
    return (
        <div className=" w-screen h-screen bg-black/30 backdrop-blur-xl flex justify-center items-center">
            <div className=" relative w-[40%] h-fit bg-white rounded-md p-4 flex flex-col justify-center items-center gap-4">
               <SlClose className=" absolute top-2 left-2 cursor-pointer hover:scale-110 duration-75 " onClick={()=>
                {
                    ok()
                location.reload()
                }
                   
                
                }/>
               
                <h2 className="text-xl font-bold text-red-400">{heading}</h2>
            <p className="text-sm font-medium"  >{message}</p>
            </div>
           
        </div>
    );  

    }

    export const Confirm_message = ({heading,message,ok,cancel})=>(

         <div className=" w-screen h-screen bg-black/30 backdrop-blur-xl flex justify-center items-center">
            <div className=" relative w-[40%] h-fit bg-white rounded-md p-4 flex flex-col justify-center items-center gap-4">
              
               
                <h2 className="text-xl font-bold text-red-400">{heading}</h2>
            <p className="text-sm font-medium"  >{message}</p>

            <div className="w-full h-fit flex justify-around items-center ga">
                <button onClick={()=>ok()} className="w-[40%] bg-orange-400  text-white rounded-xl py-1 text-center ">Yes</button>
                <button onClick={()=>cancel()} className="w-[40%] bg-white shadow  rounded-xl py-1 text-center ">No</button>
            </div>
            </div>
           
        </div>
    )
  
    


