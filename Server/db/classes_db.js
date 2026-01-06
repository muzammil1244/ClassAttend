import pool from "../connections/db_connent.js"

let sql = `
CREATE TABLE IF NOT EXISTS classes_db(
id INT AUTO_INCREMENT PRIMARY KEY,
class_name VARCHAR(100),
class_year INT,
course_id INT
)
`

export const classes_db=async()=>{

try {

    await pool.query(sql)
console.log("classes db created ")
} catch (error) {
    return console.log("classes db create problem fixed",error)
}

}