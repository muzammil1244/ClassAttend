import { useEffect, useState } from "react";
import {
  LuUserCheck,
  LuUserX,
  LuUsers,
  LuCalendarDays,
  LuDownload,
} from "react-icons/lu";

export const Read_att = (item) => {
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
    <div className="w-full h-full bg-gray-50 rounded-2xl p-6">

      {/* HEADER */}
      {students[0] && (
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-xl">
              <LuCalendarDays className="text-orange-500 text-xl" />
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
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition"
          >
            <LuDownload size={18} />
            Download CSV
          </button>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <StatCard icon={<LuUsers />} label="Total Students" value={total} />
        <StatCard icon={<LuUserCheck />} label="Present" value={present} highlight />
        <StatCard icon={<LuUserX />} label="Absent" value={absent} danger />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-4 bg-orange-50 px-6 py-4 text-sm font-semibold text-gray-600">
          <span>Roll No</span>
          <span>Name</span>
          <span>Status</span>
          <span>Remark</span>
        </div>

        {students.map((stu, index) => (
          <div
            key={index}
            className="grid grid-cols-4 px-6 py-4 border-t text-sm items-center hover:bg-gray-50 transition"
          >
            <span className="text-gray-600">{stu.roll_no}</span>
            <span className="font-medium text-gray-800">{stu.name}</span>

            <span>
              {stu.status === "P" ? (
                <StatusBadge type="present" />
              ) : (
                <StatusBadge type="absent" />
              )}
            </span>

            <span className="text-gray-400">
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

  if (highlight) style = "bg-orange-50 text-orange-600";
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