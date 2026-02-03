import { useEffect } from "react"
import Text_input from "../component/inputfiled"
import { LuAtSign  } from "react-icons/lu";


export const Register = () => {


    

    // API CALL
console.log("hello muzammil oar ")
    const register_api = async () => {

        let data = await fetch(`${import.meta.env.VITE_DOMAIN}/auth/register`, {
            method: "POST",

        })
    }

        // useEffect(() => {
        //     register_api()


        // }, [])

        return <div className="h-screen w-screen flex justify-center bg-blue-50 items-center">

            <div className="w-fit p-5 gap-3 flex flex-row justify-around h-fit rounded-2xl border-2 border-white shadow-black shadow-2xs">
{/* for inputs  */}
<div className="bg-white rounded-2xl">
    <form action="submit">
<div className=" items-center justify-center flex-col flex gap-2 p-3 border-1 border-gray-200 ">
<Text_input placholder={"email"} name={"email"} type={"email"} lbname={"email"} lbval={<LuAtSign/>}/>
<Text_input placholder={"password"} name={"password"} type={"password"} lbname={"password"} lbval={"password"}/>


<Text_input placholder={"name"} name={"name"} type={"text"} lbname={"name"} lbval={"name"}/>
<Text_input placholder={"department"} name={"department"} type={"text"} lbname={"department"} lbval={"department"}/>

</div>


    </form>

</div>
{/* for descriptions  */}
<div className="bg-white rounded-2xl ">
    <form action="submit">
<div className=" flex-col flex gap-2 p-3 border-1 border-gray-200 ">
<Text_input placholder={"email"} name={"email"} type={"email"} lbname={"email"} lbval={"email"}/>
<Text_input placholder={"email"} name={"email"} type={"email"} lbname={"email"} lbval={"email"}/>


<Text_input placholder={"email"} name={"email"} type={"email"} lbname={"email"} lbval={"email"}/>
<Text_input placholder={"email"} name={"email"} type={"email"} lbname={"email"} lbval={"email"}/>

</div>


    </form>

</div>

            </div>

        </div>



    


    


}
export default Register



