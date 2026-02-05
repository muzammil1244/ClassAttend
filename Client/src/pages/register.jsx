import { useState } from "react"
import Text_input from "../component/inputfiled"
import { LuAtSign, LuBuilding, LuLock, LuUser } from "react-icons/lu";
import Ok_button, { Cancel_button } from "../component/buttons";
import { Succes_Message, Failure_Message } from "../component/message"
import { useNavigate } from "react-router-dom";
export const Register = () => {





  // use states

  const [get_register_input, set_register_input] = useState({
    email: "",
    password: "",
    name: "",
    depname: ""

  })

  const [on_spiner, set_on_spiner] = useState(false)

  const [success_message, set_success_message] = useState(false)
  const [failure_message, set_failure_message] = useState(false)


  // hooks calling 
  const navigate = useNavigate();


  // API CALL
  const register_api = async (e) => {
    e.preventDefault();
    set_on_spiner(true);
    if (!get_register_input.email || !get_register_input.password || !get_register_input.name || !get_register_input.depname) {
      console.error("All fields are required");
      set_on_spiner(false);
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DOMAIN}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: get_register_input.email,
            password: get_register_input.password,
            name: get_register_input.name,
            department: get_register_input.depname
          })
        }
      );

      const res = await response.json();

      if (!response.ok) {
        set_failure_message(true);
        set_on_spiner(false);
        console.error("Error from register API:", res);
        return;
      }

      set_on_spiner(false);
      navigate('/login');
      console.log("Register API success:", res);
    } catch (err) {
      set_on_spiner(false);
      set_failure_message(true);
      console.error("Network / server error:", err);
      return false;
    }
  };





  return <div className="h-screen w-screen flex justify-center bg-white items-center">

    <h1 className=" absolute top-10 text-4xl font-bold text-gray-800 "> <span className="  animate-pulse text-orange-500">Class</span>Attend</h1>

    <div className="w-fit  p-5 gap-3 flex flex-row justify-around h-fit rounded-2xl  shadow-gray-500 shadow">
      {/* for inputs  */}
      <div className="bg-gray-800 h-full p-10 w-full flex justify-center items-center overflow-hidden rounded-2xl">
        <form onSubmit={register_api} className=" flex flex-col gap-4  bg-gray-800" >
          <Text_input onChange={(value) => set_register_input((prev) => ({ ...prev, email: value }))} placholder={"email"} name={"email"} type={"email"} lbname={"email"} lbval={<LuAtSign />} />
          <Text_input onChange={(value) => set_register_input((prev) => ({ ...prev, password: value }))} placholder={"password"} name={"password"} type={"password"} lbname={"password"} lbval={<LuLock />} />


          <Text_input onChange={(value) => set_register_input((prev) => ({ ...prev, name: value }))} placholder={"name"} name={"name"} type={"text"} lbname={"name"} lbval={<LuUser />} />
          <Text_input onChange={(value) => set_register_input((prev) => ({ ...prev, depname: value }))} placholder={"department"} name={"department"} type={"text"} lbname={"department"} lbval={<LuBuilding />} />


          {/* for buttons */}
          <div className=" flex gap-4 justify-center items-center   ">
            {
              on_spiner ? <div className=" flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div> : <Ok_button type="submit" onClick={register_api} text={"Register"} />

            }



            <Cancel_button onClick={() => set_register_input({
              email: "",
              password: "",
              name: "",
              depname: ""
            })} text={"Cancel"} />
          </div>
        </form>

      </div>





      {/* for description */}

      <div className="bg-orange-400 rounded-2xl ">
        <div className=" p-10  w-96 h-full flex flex-col justify-center items-center gap-4 ">
          <h1 className=" text-3xl font-bold text-white ">Welcome to ClassAttend</h1>
          <p className=" text-white font-semibold text-center
        transition-all duration-300 
        
        ">Join us today and streamline your class attendance management with ease!</p>
        </div>
      </div>




    </div>

    {/* messages  */}

    {failure_message && <div className="w-screen h-screen absolute ">
      <Failure_Message ok={() => set_failure_message(false)} heading={"Registration Failed"} message={"Please try again later."} />
    </div>

    }



    {success_message && <div className="w-screen h-screen absolute ">
      <Succes_Message cancel={() => set_success_message(false)} heading={"Registration Successful"} message={"You have been registered successfully."} />
    </div>
    }










  </div>


}
export default Register;



