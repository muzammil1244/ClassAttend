import pool from "../connections/db_connent.js"
let sql = `
CREATE TABLE IF NOT EXISTS subject_db(
id INT AUTO_INCREMENT PRIMARY KEY, 
subject VARCHAR(100),
hod_id INT
)
`


export const subject_db = async () => {

    try {
        await pool.query(sql)
        console.log("subject data have created know ")
    } catch (error) {
        console.log("error from course db", error)
    }

}