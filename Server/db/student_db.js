import pool from "../connections/db_connent.js"



let sql = `
CREATE TABLE IF NOT EXISTS student_db(
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(150) UNIQUE,
password VARCHAR(255),
name VARCHAR(100),
roll_no INT,
class_id INT
)
`


export const student_db = async () => {

    try {
        await pool.query(sql)

        return console.log("student data base created successfully")
    } catch (error) {
        return console.log(error, "from student database")
    }
}