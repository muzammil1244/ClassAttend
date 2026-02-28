import { SlClose } from "react-icons/sl";
import {  LuTriangleAlert } from "react-icons/lu";



import { FiCheckCircle, FiX } from "react-icons/fi";

export const Succes_Message = ({ heading, message, cancel }) => {
  const handleClose = () => {
    cancel();
    // tumhara existing behavior
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center">

      {/* Modal */}
      <div className="w-[420px] bg-white rounded-2xl shadow-2xl p-6 relative flex flex-col items-center gap-4 animate-scaleIn">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        >
          <FiX size={20} />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <FiCheckCircle className="text-green-500" size={30} />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-800">
          {heading}
        </h2>

        {/* Message */}
        <p className="text-sm text-gray-500 text-center leading-relaxed">
          {message}
        </p>

      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-scaleIn {
            animation: scaleIn 0.18s ease-out;
          }
        `}
      </style>
    </div>
  );
};

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


export const Confirm_message = ({ heading, message, ok, cancel }) => (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center">

    {/* Modal */}
    <div className="w-[420px] bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-5 animate-scaleIn">

      {/* Icon + Heading */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100">
          <LuTriangleAlert className="text-2xl text-red-500" />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">
          {heading}
        </h2>

        <p className="text-sm text-gray-500 leading-relaxed">
          {message}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-2">
        <button
          onClick={cancel}
          className="w-1/2 py-2 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={ok}
          className="w-1/2 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition shadow-md"
        >
          Confirm
        </button>
      </div>
    </div>

    {/* Animation */}
    <style>
      {`
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn {
          animation: scaleIn 0.18s ease-out;
        }
      `}
    </style>

  </div>
);
    


