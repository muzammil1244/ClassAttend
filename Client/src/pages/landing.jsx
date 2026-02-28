import { FaChalkboardTeacher, FaCheck, FaCheckCircle, FaUserGraduate, FaUserTie } from "react-icons/fa"
import { LuDatabase, LuSheet } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
export const Landing = () => {
let navigate = useNavigate()
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 }
}
    return (

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
            {/* first page */}
          <div className="w-full py-5 lg:py-1 bg-white flex flex-col">

  {/* Header */}
<header className="w-full bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-4 flex items-center justify-between">

    {/* Left Side */}
    <div className="flex items-center gap-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
        ClassAttend
      </h1>

      <a className="hidden sm:block text-gray-500 hover:text-orange-500 cursor-pointer transition">
        About
      </a>
    </div>

    {/* Right Side */}
    <div className="flex items-center gap-2 sm:gap-3">
      <button
        onClick={() => navigate("/login")}
        className="px-4 sm:px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm sm:text-base"
      >
        Login
      </button>

      <button
        onClick={() => navigate("/register")}
        className="px-4 sm:px-5 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition text-sm sm:text-base"
      >
        Register
      </button>
    </div>

  </div>
</header>


  {/* Hero Content */}
  <div className="flex-1 flex justify-center items-center px-6 lg:px-16">

    <motion.div 
 initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: false }}
    
    className="max-w-4xl text-center space-y-6">

      {/* Tagline */}
      <span className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-medium">
        Smart Digital Attendance System
      </span>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
        Manage Attendance for
        <span className="text-orange-500"> Colleges & Schools </span>
        Effortlessly
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Track, analyze, and automate attendance in minutes. Built for modern
        institutions to reduce manual work and provide complete academic visibility.
      </p>

      {/* CTA */}
   <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
        <button onClick={()=>{
        navigate("/register")
      }} className="px-7 py-3 bg-orange-500 text-white rounded-xl shadow-lg hover:bg-orange-600 transition">
          Get Started
        </button>

        
      </div>

    </motion.div>

  </div>

</div>


            {/* second page  */}
           <div className="w-full py-20 lg:py-28 bg-white  flex flex-col justify-center items-center px-6 md:py-10 lg:py-20">

    {/* Image Container */}
    <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6 lg:p-10 flex justify-center items-center">
        <div className="w-full h-[260px] sm:h-[340px] lg:h-[420px] flex justify-center items-center">
            <img
            
                src="./src/att image/Screenshot 2026-02-26 013242.png"
                alt="Attendance Preview"
                className="max-w-full max-h-full object-contain"
            />
        </div>
    </div>

    {/* Caption */}
    <p className="text-gray-500 text-lg mt-8 text-center max-w-xl leading-relaxed">
        Super simple control panel designed for clarity — manage students,
        classes, and attendance without any complexity.
    </p>

</div>

            {/* third page */}
          <div className="w-full py-20 lg:py-28 bg-orange-500 flex flex-col items-center justify-center px-6 py-24">

    {/* Heading */}
    <motion.div
     initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: false }}
  
  className="max-w-3xl text-center space-y-10 mb-16">
        <p className="text-white/80 text-lg tracking-wide">ClassAttend</p>

        <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            Your Attendance Management Software
            <br />
            That Works For You
        </h1>

        <p className="text-orange-100 text-lg">
            Automate tracking, reduce manual effort, and gain complete visibility
            over attendance with a system built for modern institutions.
        </p>
    </motion.div>


    {/* Feature Box */}
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 lg:p-12 max-w-4xl my-30 w-full shadow-xl">

        <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* Icon */}
            <div className="bg-white/20 p-5 rounded-2xl text-white text-4xl">
                <LuSheet />
            </div>

            {/* Features List */}
            <ul className="space-y-4">
                <li className="text-white text-lg flex items-center gap-3">
                    <FaCheckCircle className="text-white" />
                    Digital Attendance Marking
                </li>

                <li className="text-white text-lg flex items-center gap-3">
                    <FaCheckCircle />
                    Real-Time Dashboard Monitoring
                </li>

                <li className="text-white text-lg flex items-center gap-3">
                    <FaCheckCircle />
                    Automated Daily & Monthly Reports
                </li>

                <li className="text-white text-lg flex items-center gap-3">
                    <FaCheckCircle />
                    Student-Wise Attendance Analytics
                </li>

                <li className="text-white text-lg flex items-center gap-3">
                    <FaCheckCircle />
                    Simple Interface for Faculty
                </li>
            </ul>

        </div>

    </div>

</div>

            {/* fourth page */}

            <div className="w-full py-20 lg:py-28 overflow-hidden bg-white  flex flex-col items-center">

                {/* headers */}
               <div className="w-full px-6 my-20 lg:px-16 py-20 bg-white">

  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

    {/* Left Content */}
    <div className="space-y-10">
      <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 leading-snug">
        Flexible Role-Based Access for Every User
      </h1>

      <p className="text-gray-600 text-lg">
       Designed for modern institutions, our system offers dedicated dashboards for Students, Teachers, and HODs to manage their tasks easily.
Teachers can mark attendance and manage classes, Students can track their attendance and progress, and HODs can monitor reports and oversee department activities — ensuring clarity, accountability, and smooth academic operations with less manual work.

      </p>
    </div>

    {/* Right Cards */}
    <motion.div
    variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{ once: false }}
    className="grid grid-cols-1 sm:grid-cols-2 gap-6">

      {/* HOD Card */}
      <motion.div 
      variants={item}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 space-y-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 text-orange-500">
          <FaChalkboardTeacher size={26} />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">
          Head of Department
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed">
          Manage courses, assign faculty, monitor attendance analytics,
          and oversee department-wide academic performance in real time.
        </p>
      </motion.div>

      {/* Teacher Card */}
      <motion.div
      variants={item}
       className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 space-y-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
          <FaUserTie size={24} />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">
          Teachers
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed">
          Mark attendance instantly, manage class sessions, and maintain
          accurate daily records without paperwork or manual tracking.
        </p>
      </motion.div>

      {/* Student Card */}
      <motion.div
      variants={item}
       className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 space-y-4 sm:col-span-2">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-500">
          <FaUserGraduate size={24} />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">
          Students
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed">
          View attendance status, track subject-wise performance,
          and stay informed with a simple and transparent dashboard.
        </p>
      </motion.div>

    </motion.div>

  </div>

</div>


            </div>

            {/* five page */}


          <div className="w-full py-20 lg:py-28 bg-white flex flex-col items-center justify-center px-6 py-16 gap-12">

  {/* Top Content */}
  <motion.div 
    initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: false }}

  className="max-w-3xl mb-20 text-center space-y-5">
    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
      Smart Attendance Management for Modern Institutions
    </h1>

    <p className="text-lg text-gray-600">
      Manage classes, track attendance, and monitor performance with a clean,
      role-based dashboard designed for Students, Teachers, and Departments.
      No paperwork. No confusion. Just clarity.
    </p>

    {/* CTA Buttons */}
   
  </motion.div>


  {/* Image Section */}
  <div className="w-full flex justify-center">
<div className="relative w-full max-w-md sm:max-w-lg lg:max-w-2xl">
      {/* Base Image */}
      <img
        src="./src/att image/Screenshot (53).png"
        alt="Dashboard"
        className="w-full rounded-xl shadow-lg"
      />

      {/* Overlay Phone */}
      <img
        src="./src/att image/Screenshot (54).png"
        alt="Mobile View"
className="
absolute
right-[-10%] sm:right-[-12%] lg:right-[-15%]
top-[10%] sm:top-[12%]
w-24 sm:w-32 lg:w-44
"      />
    </div>
  </div>


  {/* Bottom Features */}
  <div className="grid sm:grid-cols-2 my-20 lg:grid-cols-3 gap-6 max-w-5xl text-center pt-10">

    <div className="space-y-2">
      <h3 className="font-semibold text-gray-800 text-lg">Real-Time Tracking</h3>
      <p className="text-gray-500 text-sm">
        Instantly monitor attendance and class activity without manual registers.
      </p>
    </div>

    <div className="space-y-2">
      <h3 className="font-semibold text-gray-800 text-lg">Role-Based Dashboards</h3>
      <p className="text-gray-500 text-sm">
        Separate access for students, teachers, and HODs with focused controls.
      </p>
    </div>

    <div className="space-y-2">
      <h3 className="font-semibold text-gray-800 text-lg">Simple & Transparent</h3>
      <p className="text-gray-500 text-sm">
        Clean interface that reduces workload and improves academic visibility.
      </p>
    </div>

  </div>

</div>

<div className="w-full bg-orange-500  mt-20">

  {/* Main Footer */}
  <div className="max-w-7xl mx-auto px-6 lg:px-16 py-14 grid gap-10 lg:grid-cols-4">

    {/* Brand */}
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white">ClassAttend</h1>
      <p className="text-white/60 text-sm leading-relaxed">
        Smart attendance management system designed for modern colleges
        and schools. Simplifying academic tracking with clarity and control.
      </p>
    </div>

    {/* Product */}
    <div>
      <h2 className="font-semibold text-white mb-4">Product</h2>
      <ul className="space-y-2 text-white text-sm">
        <li className="hover:text-slate-50 cursor-pointer">Features</li>
        <li className="hover:text-slate-50 cursor-pointer">How it Works</li>
        <li className="hover:text-slate-50 cursor-pointer">Pricing</li>
        <li className="hover:text-slate-50 cursor-pointer">Demo</li>
      </ul>
    </div>

    {/* Company */}
    <div>
      <h2 className="font-semibold text-white mb-4">Company</h2>
      <ul className="space-y-2 text-white text-sm">
        <li className="hover:text-slate-50 cursor-pointer">About</li>
        <li className="hover:text-slate-50 cursor-pointer">Contact</li>
        <li className="hover:text-slate-50 cursor-pointer">Support</li>
        <li className="hover:text-slate-50 cursor-pointer">Privacy Policy</li>
      </ul>
    </div>

    {/* CTA */}
    <div className="space-y-4">
      <h2 className="font-semibold text-white">Get Started</h2>
      <p className="text-white/60 text-sm">
        Start managing attendance digitally and reduce manual work today.
      </p>

      <button onClick={()=>{
        navigate("/register")
      }} className="px-5 py-3 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition">
        Create Account
      </button>
    </div>

  </div>

  {/* Bottom Bar */}
  <div className="border-t py-5 text-center text-sm text-gray-400">
    © 2026 ClassAttend. All rights reserved.
  </div>

</div>

        </div>



    )
}