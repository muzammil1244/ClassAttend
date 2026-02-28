import { useEffect, useState } from "react";
import {
  LuUserCheck,
  LuUserX,
  LuUsers,
  LuCalendarDays,
  LuDownload,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export const Read_att = (item) => {
    let navigate = useNavigate()


  useEffect(()=>{
let token = localStorage.getItem("token")
if(!token){
navigate("/login")
}
},[])
  const [students, set_students] = useState([]);
  const [loading, set_loading] = useState(true);
  const [download, set_download] = useState(false);

  const read_particular_attendance = async () => {
    const data = item.item;
    let dates = "";

    if (data.date_dat) {
      const date = new Date(data.date_dat);
      dates = date.toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }

    try {
      let url = `${import.meta.env.VITE_DOMAIN}/teacher/read/particular/attendance/${data.subject_id}/${data.class_id}/${dates}`;

      // DOWNLOAD MODE
      if (download) {
        const res = await fetch(`${url}?download=true`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const blob = await res.blob();
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `attendance_${dates}.csv`;
        link.click();
        set_download(false);
        return;
      }

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();
      set_students(result.result || []);
      set_loading(false);
    } catch (error) {
      console.log(error);
      set_loading(false);
    }
  };

  useEffect(() => {
    read_particular_attendance();
  }, []);

  useEffect(() => {
    if (download) read_particular_attendance();
  }, [download]);

  const total = students.length;
  const present = students.filter((s) => s.status === "P").length;
  const absent = students.filter((s) => s.status === "A").length;

  const formatHeaderDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-400 text-sm">Loading attendance...</div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-hidden bg-gray-50 rounded-2xl p-4 md:p-1">

      {/* HEADER */}
      {students[0] && (
<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
  
            <div className="flex items-center gap-3">
            <div className="bg-white shadow p-3 rounded-xl">
              <LuCalendarDays className="text-black text-xl" />
            </div>

            <div>
              <p className="text-sm text-gray-400">Attendance Date</p>
              <h1 className="text-xl font-semibold text-gray-800">
                {formatHeaderDate(students[0].att_date)}
              </h1>
            </div>
          </div>

          <button
            onClick={() => set_download(true)}
className="flex items-center justify-center gap-2 w-full md:w-auto bg-white text-gray-600 px-4 py-2 rounded-xl hover:bg-slate-50 transition"          >
            <LuDownload size={18} />
            Download CSV
          </button>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <StatCard icon={<LuUsers />} label="Total Students" value={total} />
        <StatCard icon={<LuUserCheck />} label="Present" value={present} highlight />
        <StatCard icon={<LuUserX />} label="Absent" value={absent} danger />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
<div className="hidden md:grid grid-cols-4 bg-white px-6 py-4 text-sm font-semibold text-gray-600">          <span>Roll No</span>
          <span>Name</span>
          <span>Status</span>
          <span>Remark</span>
        </div>

        {students.map((stu, index) => (
  <div
    key={index}
    className="
    border-t transition hover:bg-gray-50
    md:grid md:grid-cols-4 md:px-6 md:py-4 md:items-center
    p-4 space-y-2 md:space-y-0
    "
  >

    {/* MOBILE VIEW */}
    <div className="md:hidden flex justify-between">
      <span className="text-xs text-gray-400">Roll No</span>
      <span className="text-sm text-gray-700">{stu.roll_no}</span>
    </div>

    <div className="md:hidden flex justify-between">
      <span className="text-xs text-gray-400">Name</span>
      <span className="font-medium">{stu.name}</span>
    </div>

    <div className="md:hidden flex justify-between items-center">
      <span className="text-xs text-gray-400">Status</span>
      {stu.status === "P" ? (
        <StatusBadge type="present" />
      ) : (
        <StatusBadge type="absent" />
      )}
    </div>

    <div className="md:hidden flex justify-between">
      <span className="text-xs text-gray-400">Remark</span>
      <span className="text-sm text-gray-500">
        {stu.status === "P" ? "Attended" : "Not Present"}
      </span>
    </div>

    {/* DESKTOP VIEW */}
    <span className="hidden md:block text-gray-600">{stu.roll_no}</span>
    <span className="hidden md:block font-medium text-gray-800">{stu.name}</span>

    <span className="hidden md:block">
      {stu.status === "P" ? (
        <StatusBadge type="present" />
      ) : (
        <StatusBadge type="absent" />
      )}
    </span>

    <span className="hidden md:block text-gray-400">
      {stu.status === "P" ? "Attended" : "Not Present"}
    </span>
  </div>
))}
      </div>

      {students.length === 0 && (
        <div className="text-center text-gray-400 mt-10">
          No Attendance Data Found
        </div>
      )}
    </div>
  );
};

/* ----------- SMALL COMPONENTS ----------- */

const StatCard = ({ icon, label, value, highlight, danger }) => {
  let style = "bg-white text-gray-700";

  if (highlight) style = "bg-green-50 text-gray-600";
  if (danger) style = "bg-red-50 text-red-500";

  return (
    <div className={`p-5 rounded-2xl border border-gray-100 ${style}`}>
      <div className="text-xl mb-2">{icon}</div>
      <p className="text-sm">{label}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
};

const StatusBadge = ({ type }) => {
  if (type === "present") {
    return (
      <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">
        Present
      </span>
    );
  }

  return (
    <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-600 text-xs font-semibold">
      Absent
    </span>
  );
};