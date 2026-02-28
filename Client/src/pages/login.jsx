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
<div className="min-h-screen w-full bg-gray-50 flex justify-center items-center px-4 sm:px-6 py-10 sm:py-0">
    {/* Logo */}
<h1 className="absolute sm:top-10 top-4 text-2xl sm:text-4xl font-bold text-gray-800">
        <span className="text-orange-500 animate-pulse">Class</span>Attend
    </h1>

    {/* Main Card */}
<div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl grid md:grid-cols-2 overflow-hidden">
      {/* ================= LEFT — LOGIN FORM ================= */}
<div className="p-6 sm:p-10 flex flex-col justify-center">
<h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">          Welcome Back 👋
        </h2>
        <p className="text-gray-500 mb-6">
          Login to continue managing attendance.
        </p>

        <form className="flex flex-col gap-5" onSubmit={login_fun}>

          {/* Role Selector */}
<div className="flex items-center gap-3 border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50">            <LuUserRound className="text-gray-500" />

            <select
              value={get_role}
              onChange={(e) => set_role(e.target.value)}
              className="bg-transparent outline-none w-full font-semibold text-gray-700"
            >
              <option value="hod">Head of Department</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          {/* Inputs Based on Role */}
          {get_role === "hod" || get_role === "teacher" ? (
            <>
              <Text_input
                value={get_data.email}
                onChange={(v) => set_data(p => ({ ...p, email: v }))}
                placholder="Email Address"
                name="email"
                type="email"
                lbname="Email"
                lbval={<LuAtSign />}
              />

              <Text_input
                value={get_data.password}
                onChange={(v) => set_data(p => ({ ...p, password: v }))}
                placholder="Password"
                name="password"
                type="password"
                lbname="Password"
                lbval={<LuLock />}
              />
            </>
          ) : (
            <>
              <Text_input
                value={get_data.email}
                onChange={(v) => set_data(p => ({ ...p, email: v }))}
                placholder="Student Email"
                name="email"
                type="text"
                lbname="Student"
                lbval={<LuUser />}
              />

              <Text_input
                value={get_data.password}
                onChange={(v) => set_data(p => ({ ...p, password: v }))}
                placholder="Password"
                name="password"
                type="password"
                lbname="Password"
                lbval={<LuLock />}
              />
            </>
          )}

          {/* Login Button */}
          {on_spiner ? (
            <div className="flex justify-center py-3">
              <Spiner />
            </div>
          ) : (
            <Ok_button onClick={login_fun} text={"Login"} />
          )}

        </form>
      </div>

      {/* ================= RIGHT — INFO PANEL ================= */}
<div className="hidden md:flex bg-gradient-to-br from-orange-500 to-orange-400 text-white p-10 flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6">
          Smart Academic Control
        </h2>

<ul className="space-y-4 text-base lg:text-lg">
            <li className="flex gap-3 items-center">
            📊 Track attendance instantly
          </li>
          <li className="flex gap-3 items-center">
            🧑‍🏫 Role-based dashboards
          </li>
          <li className="flex gap-3 items-center">
            📁 Auto-generated reports
          </li>
          <li className="flex gap-3 items-center">
            ⏱ Save administrative time
          </li>
          <li className="flex gap-3 items-center">
            🎯 Built for colleges & schools
          </li>
        </ul>

        <p className="mt-8 text-white/80">
          One platform for HOD, Teachers, and Students.
        </p>
      </div>

    </div>

    {/* ================= ALERTS ================= */}

    {failure_message && (
<div className="fixed inset-0 flex items-center justify-center p-4">
          <Failure_Message
          ok={() => set_failure_message(false)}
          heading="Login Failed"
          message="Please check your credentials."
        />
      </div>
    )}

    {all_filed_err && (
      <div className="fixed inset-0">
        <Failure_Message
          ok={() => set_all_filed_err(false)}
          heading="Missing Fields"
          message="Please fill all required fields."
        />
      </div>
    )}

  </div>
);
}

