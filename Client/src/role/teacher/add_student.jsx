import { useEffect, useState } from "react";
export const AddStudent =({item ,updateData}) =>{

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
    <div className="min-h-screen bg-orange-50 overflow-hidden flex items-center justify-center">

      {/* CARD */}
      <div className="w-[420px] bg-white shadow-xl overflow-hidden rounded-2xl p-8 border border-orange-100">

        <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
        {update?"Update Student":"Add Student"}  
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-orange-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-orange-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-orange-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="text"
            name="roll_no"
            placeholder="Roll Number"
            value={form.roll_no}
            onChange={handleChange}
            className="w-full border border-orange-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="text"
            name="class_id"
            placeholder="Class ID"
            value={form.class_id}
            onChange={handleChange}
            className="w-full border border-orange-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white font-semibold transition
            ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
              }`}
          >
            {loading ? "Adding..." : "Add Student"}
          </button>

        </form>
      </div>

      {/* ✅ SUCCESS POPUP */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">

          <div className="bg-white rounded-2xl shadow-2xl p-8 w-[320px] text-center border border-green-200">

            <h3 className="text-xl font-bold text-green-500 mb-3">
              ✅ Success
            </h3>

            <p className="text-gray-600 mb-6">
              Student <span>{update?"Updated":"Added"}</span> Successfully!
            </p>

            <button
              onClick={() => setSuccess(false)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              OK
            </button>

          </div>
        </div>
      )}

    </div>
  );
}