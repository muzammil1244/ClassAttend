import { useEffect, useState } from "react";
import Ok_button from "../component/buttons";
import Text_input from "../component/inputfiled"
import { LuAtSign, LuBuilding, LuLock, LuUser, LuUserRound } from "react-icons/lu";
import { Failure_Message } from "../component/message";
import Spiner from "../component/spiner";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export const Loging = () => {

    const navigate = useNavigate()


    const [get_role, set_role] = useState("hod");
    const [get_data, set_data] = useState({ email: "", password: 0 });
    const [success_message, set_success_message] = useState(false)
    const [failure_message, set_failure_message] = useState(false)
    const [all_filed_err, set_all_filed_err] = useState(false)
    const [on_spiner, set_on_spiner] = useState(false)
    const login_fun = async (e) => {
        e.preventDefault();
        set_on_spiner(true)
        if (!get_role || !get_data.email || !get_data.password) {
            console.error("All fields are required for login", get_data);
            set_all_filed_err(true);
            set_on_spiner(false)
            return;
        }

        console.log("Login data:", { role: get_role, email: get_data.email, password: get_data.password });
        // API CALL
        try {
            const response = await fetch(`${import.meta.env.VITE_DOMAIN}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ role: get_role, email: get_data.email, password: get_data.password })
            });

            const res = await response.json();
           if (!response.ok) {
    set_on_spiner(false);
    set_failure_message(true);
    console.error("Login API error:", res.message);
    return; // ⛔ STOP here if login failed
}

// ✅ Only runs when login SUCCESS
if (!res.token) {
    console.error("Token not received from server");
    return;
}

localStorage.setItem("token", res.token);

const decoded = jwtDecode(res.token);
console.log("Decoded:", decoded);


        console.log("data of decoded",decoded)
        if(decoded.role === "teacher"){
            navigate("/teacher/dashboard")
        }else if(decoded.role === "hod"){
            navigate("/hod/dashboard")
        }else if(decoded.role === "student"){
            navigate("/student/dashboard")
        }
        
        } catch (err) {
            set_on_spiner(true);
            set_failure_message(true);
            console.error("Login API error:", err);
        }
    }

    useEffect(() => {
        set_data({ email: "", password: "" })
    }, [get_role])


    return (
        <div className="bg-white w-screen h-screen flex justify-center items-center">
            <h1 className=" absolute top-10 text-4xl font-bold text-gray-800 "> <span className="  animate-pulse text-orange-500">Class</span>Attend</h1>

            <div className="w-fit  p-5 gap-3 flex flex-row justify-around h-fit rounded-2xl  shadow-gray-500 shadow">
                {/* for inputs */}
                <div className="bg-gray-800 h-full p-10 w-full flex justify-center items-center overflow-hidden rounded-2xl">

                    <form className=" w-full flex h-full flex-col justify-center gap-5" onSubmit={login_fun}>
                        <div className=" w-full flex gap-2 justify-around items-center h-full">
                            <LuUserRound className="text-white" />
                            <select value={get_role} onChange={(e) => set_role(e.target.value)} className=" outline-orange-500 w-full bg-white hover:bg-white border-1 rounded-xl p-2 text-center 
  font-semibold
    " name="Role" id="role">

                                <option value="hod">HOD</option>
                                <option value="teacher">teacher</option>
                                <option value="student">student</option>

                            </select>
                        </div>


                        {/* for hod and teacher  */}


                        {
                            get_role === "hod" || get_role === "teacher" ? <div className="flex flex-col gap-3">
                                <Text_input value={get_data.email} onChange={(value) => set_data((prev) => ({ ...prev, email: value }))} placholder={"email"} name={"email"} type={"email"} lbname={"email"} lbval={<LuAtSign />} />
                                <Text_input value={get_data.password} onChange={(value) => set_data((prev) => ({ ...prev, password: value }))} placholder={"password"} name={"password"} type={"password"} lbname={"password"} lbval={<LuLock />} />
                            </div> : <div className="flex flex-col gap-3">
                                <Text_input value={get_data.email} onChange={(value) => set_data((prev) => ({ ...prev, email: value }))} placholder={"student email"} name={"email"} type={"text"} lbname={"name"} lbval={<LuUser />} />
                                <Text_input value={get_data.password} onChange={(value) => set_data((prev) => ({ ...prev, password: value }))} placholder={"password"} name={"password]"} type={"text"} lbname={"role"} lbval={<LuUserRound />} />
                            </div>
                        }


{
    on_spiner ? <div className="w-full h-full flex justify-center items-center"><Spiner/></div>:<Ok_button onClick={login_fun} text={"Login"} />

}
                    </form>

                </div>

                {/* for descriptions */}
                <div className="bg-orange-400 rounded-2xl ">
        <div className=" p-10  w-96 h-full flex flex-col justify-center items-center gap-4 ">
          <h1 className=" text-3xl font-bold text-white ">Welcome to Login</h1>
          <ul className= " text-left text-[15px] text-white font-semibold  ">
            <li>Select your role first.</li>
             <li>Enter all required details based on your role.</li>
              <li>Do not leave any field blank</li>
          </ul>
          </div>
      </div>
            </div>
            {failure_message && <div className="w-screen h-screen absolute ">
                <Failure_Message ok={() => set_failure_message(false)} heading={"Login Failed"} message={"Please try again later."} />
            </div>

            }
            {all_filed_err && <div className="w-screen h-screen absolute ">
                <Failure_Message ok={() => set_failure_message(false)} heading={"Login Failed"} message={"Please try again later."} />
            </div>

            }




        </div>
    )
}

