import { useEffect, useState } from "react";
import { LuAtSign, LuLock, LuPhone, LuUserRound } from "react-icons/lu";
import { SlLock, SlPhone } from "react-icons/sl";

import Text_input from "../../component/inputfiled";
import Ok_button, { Delete_button } from "../../component/buttons";

export const Crud_teacher = () => {
  // ✅ Form State
  const [formData, setFormData] = useState({

    email: "",
    password: "",
    name: "",
    number: "",
    gender: "",

  });

  // ✅ Teachers List
  const [teachers, setTeachers] = useState([]);

  // ✅ For Update Mode
  const [editIndex, setEditIndex] = useState(null);


  // api call

  let token = localStorage.getItem("token")

  const read_teacher = async () => {
    try {

      let response = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/read/teacher`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
      )
      let data = await response.json()

      if (!response.ok) {
        return console.log("response err", response)
      }
      setTeachers(data.data)
      console.log("teacher list", data)
    } catch (error) {
      return console.log(error)
    }
  }


  useEffect(() => {
    read_teacher()
  }, [])
  // ✅ Handle Input Change


  // ✅ Add / Update Teacher
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData)

    try {
      const url =
        editIndex !== null
          ? `${import.meta.env.VITE_DOMAIN}/hod/update/teacher/${teachers[editIndex].id}`
          : `${import.meta.env.VITE_DOMAIN}/hod/add/teacher`;

      const method = editIndex !== null ? "PATCH" : "POST";

      let response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          gender: formData.gender,
          mobile_number: formData.number

        }),
      });

      let data = await response.json();

      if (!response.ok) {
        return alert(data.message || "Something went wrong");
      }

      // 🔥 Refresh list from DB
      read_teacher();

      // Reset
      setFormData({
        email: "",
        password: "",
        name: "",
        number: "",
        gender: "",
      });

      setEditIndex(null);
    } catch (error) {
      console.log(error);
    }
  };


  // ✅ Delete Teacher
  const handleDelete = async (index) => {
    try {
      let response = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/delete/teacher/${teachers[index].id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        return console.log("data not deleted from teacher list ")
      }

      console.log("data have deleted successfully")

      read_teacher()
    } catch (error) {

    }
  };

  // ✅ Edit Teacher
  const handleEdit = (index) => {
    const teacher = teachers[index];

    setFormData({
      email: teacher.email,
      password: "", // password kabhi DB se fill nahi karte
      name: teacher.name,
      number: teacher.mobile_number,
      gender: teacher.gender,
    });

    setEditIndex(index);
  };





  return (
  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 p-6">
    <div className="grid grid-cols-2 gap-6 h-full">

      {/* ================= FORM ================= */}
      <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl p-8 overflow-auto">

        <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3">
          {editIndex !== null ? "Update Teacher" : "Add New Teacher"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">Email</label>
            <div className="flex items-center border rounded-xl px-3 focus-within:ring-2 ring-orange-400 transition">
              <LuAtSign className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                className="w-full p-3 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">Password</label>
            <div className="flex items-center border rounded-xl px-3 focus-within:ring-2 ring-orange-400 transition">
              <LuLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) => setFormData(p => ({ ...p, password: e.target.value }))}
                className="w-full p-3 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">Full Name</label>
            <div className="flex items-center border rounded-xl px-3 focus-within:ring-2 ring-orange-400 transition">
              <LuUserRound className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter Name"
                value={formData.name}
                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                className="w-full p-3 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">Phone</label>
            <div className="flex items-center border rounded-xl px-3 focus-within:ring-2 ring-orange-400 transition">
              <SlPhone className="text-gray-400 mr-2" />
              <input
                type="number"
                placeholder="Enter Number"
                value={formData.number}
                onChange={(e) => setFormData(p => ({ ...p, number: e.target.value }))}
                className="w-full p-3 outline-none bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Gender */}
        <div className="mt-5">
          <label className="text-sm font-semibold text-gray-600 mb-1">Gender</label>
          <div className="flex items-center border rounded-xl px-3 focus-within:ring-2 ring-orange-400">
            <LuUserRound className="text-gray-400 mr-2" />
            <select
              value={formData.gender}
              onChange={(e) => setFormData(p => ({ ...p, gender: e.target.value }))}
              className="w-full p-3 outline-none bg-transparent"
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          className={`mt-6 w-full py-3 rounded-xl text-black shadow font-semibold transition-all
          ${editIndex !== null
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-white hover:bg-gray-50"
            }`}
        >
          {editIndex !== null ? "Update Teacher" : "Add Teacher"}
        </button>
      </div>

      {/* ================= LIST ================= */}
      <div className="bg-white/70 backdrop-blur-xl shadow-xl overflow-y-auto rounded-3xl p-6 flex flex-col h-full">

        <h1 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">
          Teacher List
        </h1>

        <div className="overflow-y-auto flex flex-col gap-4 pr-2">
          {teachers.length === 0 && (
            <p className="text-gray-400 text-center py-10">No Teachers Added</p>
          )}

          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="group p-4 hover:bg-orange-50 border border-gray-200 hover:border-orange-400 bg-white rounded-xl hover:shadow-lg  transition-all"
            >
              <div className="flex justify-between  items-center">

                {/* Info */}
                <div className="flex flex-col gap-1 text-sm">
                  <h1 className="flex items-center gap-2 font-semibold">
                    <LuUserRound /> {teacher.name}
                  </h1>
                  <p className="flex items-center gap-2 text-gray-500">
                    <LuAtSign /> {teacher.email}
                  </p>
                  <p className="flex items-center gap-2 text-gray-500">
                    <LuPhone /> {teacher.mobile_number}
                  </p>
                  <p className="text-gray-500">Gender: {teacher.gender}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 opacity-70 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-4 py-1.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(index)}
                    className="px-4 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);

};
