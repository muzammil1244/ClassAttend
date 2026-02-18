
import {
  LuBookOpen,
  LuSchool,
  LuUser,
  LuMail,
  LuHash,
  LuLayers
} from "react-icons/lu";


export const Main = () => {

    


    return (
        <div className="w-full h-full rounded-2xl shadow overflow-y-auto  rounded-2xl bg-white p-4"> 

<div>
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Teacher Dashboard</h1>
    <p className="text-gray-600 mb-6">Here you can manage your classes, view student attendance, and more.</p>
        </div>

        <div>

   <div className="bg-white p-5 rounded-2xl shadow-md w-full h-40 border border-gray-200 cursor-pointer hover:shadow-lg transition duration-200">

      {/* Class Name */}
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
        <LuSchool className="text-orange-500" />
        Aamer sir class
      </h2>

      {/* Info Section */}
      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">

        <p className="flex items-center gap-2">
          <LuBookOpen />
          Course: <span className="font-medium"> BCA</span>
        </p>

        <p className="flex items-center gap-2">
          <LuBookOpen />
          Subject: <span className="font-medium">SQL</span>
        </p>

        <p className="flex items-center gap-2">
          <LuUser />
          Teacher: <span className="font-medium">Aamer</span>
        </p>
      </div>

      {/* Email */}
      <div className="mt-3 pt-2 border-t text-sm text-gray-500 flex items-center gap-2">
        <LuMail />
        Aamer@gmail.com
      </div>

    </div>

        </div>

        </div>
    )
}   