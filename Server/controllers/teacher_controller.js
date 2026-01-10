
import pool from "../connections/db_connent.js"
// CRUD OPERATION OF WITH STUDENT

export const add_student = (req, res) => {
    return res.send("add student ")
}

export const update_student = (req, res) => {
    return res.send("update student ")
}

export const delete_student = (req, res) => {
    return res.send("delete student ")
}



// ATTENDANCE MANAGEMENT

export const teacher_classes = async (req, res) => {

    let teacher_id = req.user?.id
    if (!teacher_id) {

        return res.status(401).json({
            message: "teacher id not found here "
        })

    }

    try {

        let sql = `
        SELECT c.class_name, s.subject, t.name, t.email
        FROM class_subject_db cs
        JOIN classes_db c ON  c.id = cs.class_id
        JOIN subject_db s ON s.id = cs.subject_id
        JOIN teacher_db t ON t.id = cs.teacher_id
        WHERE cs.teacher_id = ?
        `

        let [result] = await pool.query(sql, [teacher_id])

        return res.status(200).json({
            message: "classes are founded according to teacher id ",
            result
        })
    } catch (error) {
        return res.status(500).json({
            message: "error from the teacher classes read ",
            error
        })
    }

}


export const read_student = (req, res) => {
    return res.send("read student ")
}

export const see_particular_student_scores = () => {
    return res.send("student score")
}

export const create_attendance = async (req, res) => {

    let teacher_id = req.user?.id
    let {
        class_id, subject_id, attendance, att_date
    } = req.body
    try {

        let value = attendance.map((items) => [
            items.student_id,
            class_id,
            subject_id,
            teacher_id,
            att_date,
            items.status]

        )



        let sql = `
INSERT INTO att_db(student_id,class_id,subject_id,teacher_id,att_date,status) VALUES ?

ON DUPLICATE KEY UPDATE
            status = VALUES(status)

`

        let [data] = await pool.query(sql, [value])

        return res.status(200).json({
            message: "attendance added successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            message: "error from create attendance",
            error
        })
    }
}

export const download_student_attendance = (req, res) => {
    return res.send("read student ")
}

export const update_attendance = (req, res) => {
    return res.send("read student ")
}

export const read_all_attendance = (req, res) => {
    return res.send("read student ")
}

export const read_particular_attendance = (req, res) => {
    return res.send("read student ")
}

