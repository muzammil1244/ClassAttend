
import { json } from "express"
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

export const read_student = (req, res) => {
    return res.send("read student ")
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


export const see_particular_student_scores = async (req, res) => {
    let teacher_id = req.user?.id
    let student_id = req.params?.id
    let subject_id = req.params?.sub
    try {

        if (!teacher_id || !student_id) {
            return res.status(400).json({
                message: "all field required"
            })
        }

        let sql_student = `
        SELECT * FROM student_db WHERE id = ?
        `
        let [confirm_studnet] = await pool.query(sql_student, [student_id])



        let sql_sub = `
SELECT * FROM subject_db WHERE id = ?
`

        let [confirm_sub] = await pool.query(sql_sub, [subject_id])

        if (confirm_studnet.length < 1 || confirm_sub.length < 1) {
            return res.status(401).json({
                message: "student or subject are not founded in db"
            })
        }




        let sql_score = `
SELECT COUNT(*) AS total ,
SUM(CASE WHEN status ='P' THEN 1 ELSE 0 END ) AS present_classes 
 from att_db WHERE teacher_id = ? AND subject_id = ? AND student_id =?

`
        let [result] = await pool.query(sql_score, [teacher_id, subject_id, student_id])

        let total = result[0].total
        let present = result[0].present_classes

        let percentage = (present / total) * 100
        console.log(typeof (total), total, " |", typeof (present), present, percentage)
        return res.status(200).json({
            message: "att score collect successfully",
            percentage
        })

    } catch (error) {
        return res.status(500).json({
            message: "error from the read student scores ",
            error
        })
    }
}

export const see_particular_subject_score = async (req, res) => {


    try {
        let subject_id = req.params?.sub
        let class_id = req.params?.class

        let sql = `
        SELECT 
COUNT(DISTINCT s.id) AS total_students,
COUNT(DISTINCT a.att_date) AS total_classes,
SUM(CASE WHEN a.status = 'P' THEN 1 ELSE 0 END) AS total_presents,
(
  SUM(CASE WHEN a.status = 'P' THEN 1 ELSE 0 END) /
  (COUNT(DISTINCT s.id) * COUNT(DISTINCT a.att_date))
) * 100 AS presenty_percentage
FROM student_db s
JOIN att_db a ON s.id = a.student_id
WHERE s.class_id = ?
AND a.subject_id = ?;

        `

        let data = await pool.query(sql,[class_id,subject_id])

        return res.status(200).json({
            message:"data collected successfully",
            data
        })

    } catch (error) {
        return res.status(500).json({
            message: "error from see_particular_subject_score ",
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

