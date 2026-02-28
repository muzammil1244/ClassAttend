import { useEffect, useState } from "react";
import { LuLoader, LuUserPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export const AddStudent =({item ,updateData}) =>{
      let navigate = useNavigate()

useEffect(()=>{
let token = localStorage.getItem("token")
if(!token){
navigate("/login")
}
},[])
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    roll_no: "",
    class_id: item.class_id
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [update ,set_update] = useState(false)

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // ❌ double click prevent

    
    try {
      setLoading(true);
var url = `${import.meta.env.VITE_DOMAIN}/teacher/add/student`
var mth = "POST"
      if(update){
        url = `${import.meta.env.VITE_DOMAIN}/teacher/update/student/${updateData.id}`
        mth = "PATCH"
      }

      console.log("FormData",form)
      const res = await fetch(url, {
        method: mth,
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);     // ✅ show popup
        setForm({
  name: "",
  email: "",
  password: "",
  roll_no: "",
  class_id: item.class_id
});
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {

  const isEditMode =
    updateData &&
    Object.keys(updateData).length > 0 &&
    updateData.id;

  if (!isEditMode) {
    // 👉 ADD MODE
    set_update(false);

    setForm({
      name: "",
      email: "",
      password: "",
      roll_no: "",
      class_id: item.class_id
    });

    return;
  }

  // 👉 EDIT MODE
  set_update(true);

  setForm({
    name: updateData.name || "",
    email: updateData.email || "",
    password: "",
    roll_no: updateData.roll_no || "",
    class_id: item.class_id
  });

}, [updateData, item]);
  return (
     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

    {/* CARD */}
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-100 text-orange-500 p-3 rounded-xl">
          <LuUserPlus size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {update ? "Update Student" : "Add New Student"}
          </h2>
          <p className="text-xs text-gray-400">
            Fill student information below
          </p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div>
          <label className="text-xs text-gray-500">Student Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-xs text-gray-500">Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-xs text-gray-500">
            {update ? "New Password (optional)" : "Password"}
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        {/* Roll No */}
        <div>
          <label className="text-xs text-gray-500">Roll Number</label>
          <input
            type="text"
            name="roll_no"
            value={form.roll_no}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        {/* Class ID (Disabled) */}
        <div>
          <label className="text-xs text-gray-500">Class ID</label>
          <input
            type="text"
            name="class_id"
            value={form.class_id}
            disabled
            className="w-full mt-1 border border-gray-100 bg-gray-100 p-3 rounded-lg text-gray-500"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white shadow-md"
            }`}
        >
          {loading && <LuLoader className="animate-spin" size={18} />}
          {update
            ? loading
              ? "Updating..."
              : "Update Student"
            : loading
            ? "Adding..."
            : "Add Student"}
        </button>

      </form>
    </div>

    {/* SUCCESS MODAL */}
    {success && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">

        <div className="bg-white rounded-2xl shadow-2xl p-8 w-[340px] text-center">

          <div className="text-green-500 text-3xl mb-3">✔</div>

          <h3 className="text-lg font-bold text-gray-800 mb-2">
            Success
          </h3>

          <p className="text-gray-500 mb-6 text-sm">
            Student {update ? "updated" : "added"} successfully.
          </p>

          <button
            onClick={() => setSuccess(false)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Close
          </button>

        </div>
      </div>
    )}
  </div>
  );
}