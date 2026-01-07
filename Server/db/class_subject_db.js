import pool from "../connections/db_connent.js"

let slq = `
CREATE TABLE IF NOT EXISTS class_subject_db(
id INT AUTO_INCREMENT PRIMARY KEY,
class_id INT,
subject_id INT,
teacher_id INT
)
`




    
export const class_subject_db=async()=>{

try {
    await pool.query(slq)
    return console.log("course and subject created ")

} catch (error) {
   return console.log("error",error)
}

}