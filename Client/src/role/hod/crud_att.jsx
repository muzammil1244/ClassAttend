import { useEffect, useState } from "react"
import { Read_att } from "./read_att"


export const Crud_att = () => {



    // use States

    const [get_courses, set_courses] = useState([])
    const [selected_course_id, set_selected_course_id] = useState(0)
    const [selected_class_id, set_selected_class_id] = useState(0)
    const [get_classes, set_classes] = useState([])
    const [get_subjects, set_subjects] = useState([])
    const [selected_subject_id, set_select_subject_id] = useState(0)
    const [get_att, set_att] = useState([])
    const [open_read_att, set_open_read_att] = useState(false)
    const [open_all_att, set_open_all_att ]= useState(true)
const[ get_particular_att ,set_particular_att] = useState([])
    // APIS


    const read_att = async () => {
        try {

            // query params build karna
            let query = new URLSearchParams()

            if (selected_class_id) query.append("class_id", selected_class_id)
            if (selected_subject_id) query.append("subject_id", selected_subject_id)

            let url = `${import.meta.env.VITE_DOMAIN}/hod/read/all/attendance?${query.toString()}`

            let res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                    , "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            let data = await res.json()

            console.log("attendance data", data)
            set_att(data.data)
        } catch (error) {
            console.log("read attendance error", error)
        }
    }


    const courses = async () => {

        try {

            const react = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/read/course`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await react.json()
            console.log(data, "courses")
            set_courses(data.data)

        } catch (error) {
            return console.log(error)
        }


    }

    const read_classes = async () => {
        if (selected_course_id == null) {
            console.log("course id not found ", selected_course_id)
            return false
        }
        try {
            const react = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/read/class/${selected_course_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await react.json()
            console.log("classes", data.data)
            set_classes(data.data)
        } catch (error) {
            return console.log(error)
        }
    }

    const read_subjects = async () => {

        try {

            let res = await fetch(`${import.meta.env.VITE_DOMAIN}/hod/att/class/id/${selected_class_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            let data = await res.json()

            console.log(data, "subjects")
            set_subjects(data.data)

        } catch (error) {
            console.log("read subject err", error)
        }
    }


    const formatDateOnly = (isoDate) => {
        if (!isoDate) return ""

        // ISO string ko Date object me convert karo
        const date = new Date(isoDate)

        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")

        return `${year}-${month}-${day}`
    }

const handleDownload = () => {
    see_particular_att({
        date: formatDateOnly(get_particular_att?.result?.[0]?.att_date),
        subject_id: selected_subject_id,
        class_id: selected_class_id,
        download: true   // 🔥 ye important hai
    })
}


    const see_particular_att = async ({ date, subject_id, class_id, download = false }) => {
        try {

            if (!date || !subject_id || !class_id) {
                console.log("Missing params", { date, subject_id, class_id })
                return
            }

            let url = `${import.meta.env.VITE_DOMAIN}/hod/attendance/download/${date}/${subject_id}/${class_id}`

            if (download) {
                url += "?download=true"
            }

            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (download) {
                const blob = await res.blob()

                const link = document.createElement("a")
                link.href = window.URL.createObjectURL(blob)
                link.download = `attendance_${date}.csv`
                link.click()

                return
            }

            const data = await res.json()
            console.log("attendance details:", data)
set_particular_att(data)
        } catch (error) {
            console.log("see particular attendance error", error)
        }
    }





    // useEffects

    useEffect(() => {
        courses()

    }, [])

    useEffect(() => {

        if (selected_class_id !== 0) {
            read_subjects()

        }
    }, [selected_class_id])



    useEffect(() => {

        read_classes()




    }, [selected_course_id])


    useEffect(() => {

        if (selected_subject_id !== 0) {
            read_att()


        }

    }, [selected_subject_id])





  return (
    <div className="bg-gray-100 min-h-screen p-6">

        <div className="bg-white rounded-2xl shadow-md p-6">

            {open_all_att && (
                <div className="flex flex-col gap-6">

                    {/* Header */}
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Attendance Records
                    </h1>

                    {/* Filters */}
                    <div className="flex gap-4 flex-wrap">

                        <select
                            onChange={(e) => set_selected_course_id(e.target.value)}
                            className="border border-gray-300 rounded-xl px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Course</option>
                            {get_courses.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <select
                            onChange={(e) => set_selected_class_id(e.target.value)}
                            className="border border-gray-300 rounded-xl px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Class</option>
                            {get_classes.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.class_name}
                                </option>
                            ))}
                        </select>

                        <select
                            onChange={(e) => set_select_subject_id(e.target.value)}
                            className="border border-gray-300 rounded-xl px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Subject</option>
                            {get_subjects.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                    </div>

                    {/* Attendance Dates List */}
                    <div className="grid gap-4">

                        {get_att.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    see_particular_att({
                                        date: formatDateOnly(item.DATE),
                                        subject_id: selected_subject_id,
                                        class_id: selected_class_id
                                    })
                                    set_open_all_att(false)
                                    set_open_read_att(true)
                                }}
                                className="cursor-pointer bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-400 transition"
                            >
                                <div className="flex justify-between items-center flex-wrap gap-3">

                                    <h2 className="font-semibold text-gray-800">
                                        📅 {formatDateOnly(item.DATE)}
                                    </h2>

                                    <p className="text-gray-600">
                                        Subject: <span className="font-medium">{item.subject}</span>
                                    </p>

                                    <p className="text-gray-600">
                                        Teacher: <span className="font-medium">{item.teacher}</span>
                                    </p>

                                </div>
                            </div>
                        ))}

                        {get_att.length === 0 && (
                            <div className="text-center text-gray-500 py-10">
                                No Attendance Found
                            </div>
                        )}

                    </div>
                </div>
            )}

            {open_read_att && (
                <Read_att
                    item={get_particular_att.result}
                    onclick={() => {
                        set_open_all_att(true)
                        set_open_read_att(false)
                        set_att([])
                    }}
                    onDownload={handleDownload}
                />
            )}

        </div>
    </div>
)
}