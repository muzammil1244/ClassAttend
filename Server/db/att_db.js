import pool from "../connections/db_connent.js"


let sql = `
CREATE TABLE IF NOT EXISTS att_db (
id INT AUTO_INCREMENT PRIMARY KEY,
student_id INT,
class_id INT ,
subject_id INT,
teacher_id INT,
att_date DATE,
status ENUM('P','A'),
UNIQUE (student_id, subject_id, att_date)


)
`

export const att_db = async () => {
    try {
        await pool.query(sql)
        console.log("att data created successfully ")
    } catch (error) {
        return console.log("att db data error for connection problem " + error)
    }
}