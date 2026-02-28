import { useState } from "react"
import Text_input from "../component/inputfiled"
import { LuAtSign, LuBuilding, LuFileText, LuLock, LuUser } from "react-icons/lu";
import Ok_button, { Cancel_button } from "../component/buttons";
import { Succes_Message, Failure_Message } from "../component/message"
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaLock, FaUser } from "react-icons/fa";
import { FiBarChart2, FiFileText } from "react-icons/fi";
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





return (
<div className="min-h-screen w-full bg-gray-50 flex justify-center items-center px-4 sm:px-6 py-10 sm:py-0">

    {/* Logo */}
    <h1 className="absolute top-10 text-4xl font-bold text-gray-800">
      <span className="text-orange-500 animate-pulse">Class</span>Attend
    </h1>

    {/* Card Container */}
    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">

      {/* ================= LEFT — FORM ================= */}
      <div className="p-10 flex flex-col justify-center">

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Create your account
        </h2>
        <p className="text-gray-500 mb-6">
          Start managing attendance digitally in minutes.
        </p>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-3 border rounded-lg py-3 hover:bg-gray-100 transition">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-gray-200 w-full" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="h-px bg-gray-200 w-full" />
        </div>

        {/* Form */}
        <form onSubmit={register_api} className="flex flex-col gap-4">

          <Text_input
            onChange={(v) => set_register_input(p => ({ ...p, email: v }))}
            placholder="Email"
            name="email"
            type="email"
            lbname="Email"
            lbval={<LuAtSign />}
          />

          <Text_input
            onChange={(v) => set_register_input(p => ({ ...p, password: v }))}
            placholder="Password"
            name="password"
            type="password"
            lbname="Password"
            lbval={<LuLock />}
          />

          <Text_input
            onChange={(v) => set_register_input(p => ({ ...p, name: v }))}
            placholder="Full Name"
            name="name"
            type="text"
            lbname="Name"
            lbval={<LuUser />}
          />

          <Text_input
            onChange={(v) => set_register_input(p => ({ ...p, depname: v }))}
            placholder="Department"
            name="department"
            type="text"
            lbname="Department"
            lbval={<LuBuilding />}
          />

          {/* Buttons */}
          <div className="flex gap-4 mt-4">

            {on_spiner ? (
              <div className="flex justify-center items-center w-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <Ok_button type="submit" text="Register" />
            )}

            <Ok_button
              onClick={() =>
                set_register_input({ email: "", password: "", name: "", depname: "" })
              }
              text="Clear"
            />
          </div>

        </form>
      </div>

      {/* ================= RIGHT — INFO PANEL ================= */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-400 text-white p-10 flex flex-col justify-center">

        <h2 className="text-3xl font-bold mb-6">
          Why ClassAttend?
        </h2>

        <ul className="space-y-5 text-lg">

          <li className="flex items-center gap-3">
            <FaCheckCircle /> Instant digital attendance
          </li>

          <li className="flex items-center gap-3">
            <FiBarChart2 /> Real-time analytics dashboard
          </li>

          <li className="flex items-center gap-3">
            <FiFileText /> Automated report generation
          </li>

          <li className="flex items-center gap-3">
            <FaLock /> Saves hours of manual work
          </li>

          <li className="flex items-center gap-3">
            <FaUser /> Built for faculty & institutions
          </li>

        </ul>

        <p className="mt-8 text-white/80">
          Manage classes smarter, not harder.
        </p>

      </div>

    </div>

    {/* ================= ALERTS ================= */}

    {failure_message && (
      <div className="fixed inset-0">
        <Failure_Message
          ok={() => set_failure_message(false)}
          heading="Registration Failed"
          message="Please try again later."
        />
      </div>
    )}

    {success_message && (
      <div className="fixed inset-0">
        <Succes_Message
          cancel={() => set_success_message(false)}
          heading="Registration Successful"
          message="You have been registered successfully."
        />
      </div>
    )}

  </div>
);


}
export default Register;



