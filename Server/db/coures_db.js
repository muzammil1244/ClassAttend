import pool from "../connections/db_connent.js"



let sql = `

CREATE TABLE IF NOT EXISTS course_db(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
hod_id INT,
FOREIGN KEY (hod_id) REFERENCES hod_db(id)
)

`


export const courses = async()=>{


 
 
     try{
 
         await pool.query(sql)
 
         console.log(
             "courses database is created now "
         )
 
     }catch(err){
 
         console.log(err) 
 
     }
 

}