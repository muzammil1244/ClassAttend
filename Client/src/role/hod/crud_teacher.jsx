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
    <div className="w-full h-full bg-white rounded-2xl">
      <div className="w-full h-full relative gap-5 grid grid-cols-2 p-5">
        {/* Title */}
        <div className="absolute top-5 left-5 bg-gray-900 rounded-2xl">
          <h2 className="text-sm font-semibold text-white px-4 py-2">
            {editIndex !== null ? "Update Teacher" : "Add Teacher"}
          </h2>
        </div>

        {/* ================= FORM ================= */}
        <div className="bg-white flex justify-center items-center py- shadow rounded-2xl">
        <form className="bg-white shadow-xl rounded-3xl p-8 w-[85%] max-w-3xl flex flex-col gap-6">

  {/* Title */}
  <h2 className="text-2xl font-bold text-gray-700 border-b pb-3">
    {editIndex !== null ? "Update Teacher" : "Add Teacher"}
  </h2>

  {/* Grid Layout */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    {/* Email */}
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-gray-600">Email</label>
      <div className="flex items-center border rounded-xl px-3 focus-within:ring-2 ring-orange-400">
        <LuAtSign className="text-gray-400 mr-2" />
        <input
          type="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
          className="w-full p-3 outline-none"
        />
      </div>
    </div>

    {/* Password */}
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-gray-600">Password</label>
      <div className="flex items-center border rounded-xl px-3 focus-within:ring-2 ring-orange-400">
        <LuLock className="text-gray-400 mr-2" />
        <input
          type="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={(e) => setFormData(p => ({ ...p, password: e.target.value }))}
          className="w-full p-3 outline-none"
        />
      </div>
    </div>

    {/* Name */}
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-gray-600">Full Name</label>
      <div className="flex items-center border rounded-xl px-3 focus-within:ring-2 ring-orange-400">
        <LuUserRound className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Enter Name"
          value={formData.name}
          onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
          className="w-full p-3 outline-none"
        />
      </div>
    </div>

    {/* Phone */}
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-gray-600">Phone Number</label>
      <div className="flex items-center border rounded-xl px-3 focus-within:ring-2 ring-orange-400">
        <SlPhone className="text-gray-400 mr-2" />
        <input
          type="number"
          placeholder="Enter Number"
          value={formData.number}
          onChange={(e) => setFormData(p => ({ ...p, number: e.target.value }))}
          className="w-full p-3 outline-none"
        />
      </div>
    </div>

  </div>

  {/* Gender */}
  <div className="flex flex-col gap-1">
    <label className="font-semibold text-gray-600">Gender</label>
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

  {/* Button */}
  <button
    type="button"
    onClick={handleSubmit}
    className="mt-4 bg-orange-500 hover:bg-orange-600 transition-all text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg"
  >
    {editIndex !== null ? "Update" : "Add"}
  </button>

</form>

        </div>

        {/* ================= LIST ================= */}
        <div className="bg-white flex flex-col gap-5 h-full overflow-y-scroll     p-5 rounded-2xl">
          <div className="bg-white shadow rounded-2xl p-4">
            <h1 className="text-xl font-semibold">Teacher List</h1>
          </div>

          <div className="w-full flex bg-white  flex-col gap-4">
            {teachers.length === 0 && (
              <p className="text-gray-400 text-center">No Teachers Added</p>
            )}

            {teachers.map((teacher, index) => (
              <div
                key={index}
                className="w-full p-3 flex justify-between bg-white shadow rounded-xl"
              >
                <div className="flex flex-col gap-2 text-sm">
                  <h1 className="flex items-center gap-2">
                    <LuUserRound /> {teacher.name}
                  </h1>
                  <h2 className="flex items-center gap-2">
                    <LuAtSign /> {teacher.email}
                  </h2>

                  <h2 className="flex items-center gap-2">
                    <LuPhone /> {teacher.mobile_number}
                  </h2>
                  <h2>Gender: {teacher.gender}</h2>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2">
                  <div onClick={() => handleEdit(index)}>
                    <Ok_button text="Update" />
                  </div>

                  <div onClick={() => handleDelete(index)}>
                    <Delete_button text="Delete" />
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
