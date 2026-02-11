import { useState } from "react";
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
    gender: "male",
  });

  // ✅ Teachers List
  const [teachers, setTeachers] = useState([]);

  // ✅ For Update Mode
  const [editIndex, setEditIndex] = useState(null);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Add / Update Teacher
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Update
      const updatedTeachers = [...teachers];
      updatedTeachers[editIndex] = formData;
      setTeachers(updatedTeachers);
      setEditIndex(null);
    } else {
      // Add
      setTeachers([...teachers, formData]);
    }

    // Reset Form
    setFormData({
      email: "",
      password: "",
      name: "",
      number: "",
      gender: "male",
    });
  };

  // ✅ Delete Teacher
  const handleDelete = (index) => {
    const filtered = teachers.filter((_, i) => i !== index);
    setTeachers(filtered);
  };

  // ✅ Edit Teacher
  const handleEdit = (index) => {
    setFormData(teachers[index]);
    setEditIndex(index);
  };

  return (
    <div className="w-full h-full bg-slate-100">
      <div className="w-full h-full relative gap-5 grid grid-cols-2 p-5">
        {/* Title */}
        <div className="absolute top-5 left-5 bg-gray-900 rounded-2xl">
          <h2 className="text-sm font-semibold text-white px-4 py-2">
            {editIndex !== null ? "Update Teacher" : "Add Teacher"}
          </h2>
        </div>

        {/* ================= FORM ================= */}
        <div className="bg-white flex justify-center items-center shadow rounded-2xl">
          <form
            onSubmit={handleSubmit}
            className="flex bg-white shadow rounded-2xl p-6 flex-col gap-5 w-[80%]"
          >
            <Text_input
              placholder="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              lbname="email"
              lbval={<LuAtSign />}
            />

            <Text_input
              placholder="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              lbname="password"
              lbval={<LuLock />}
            />

            <Text_input
              placholder="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              lbname="name"
              lbval={<LuUserRound />}
            />

            <Text_input
              placholder="number"
              name="number"
              type="number"
              value={formData.number}
              onChange={handleChange}
              lbname="number"
              lbval={<SlPhone />}
            />

            {/* Gender */}
            <div className="flex justify-between items-center">
              <label className="font-semibold">Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="outline-orange-500 border rounded-xl p-2 font-semibold"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <Ok_button text={editIndex !== null ? "Update" : "Add"} />
          </form>
        </div>

        {/* ================= LIST ================= */}
        <div className="bg-white flex flex-col gap-5 h-full p-5 rounded-2xl">
          <div className="bg-white shadow rounded-2xl p-4">
            <h1 className="text-xl font-semibold">Teacher List</h1>
          </div>

          <div className="w-full h-full overflow-y-auto flex flex-col gap-4">
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
                    <SlLock /> {teacher.password}
                  </h2>
                  <h2 className="flex items-center gap-2">
                    <LuPhone /> {teacher.number}
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
