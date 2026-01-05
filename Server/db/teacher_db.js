import pool from "../connections/db_connent.js"


let sql =`
CREATE TABLE IF NOT EXISTS teacher_db(
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(225),
password VARCHAR(225),
name VARCHAR(225),
hod_id INT,
add_time DATETIME DEFAULT CURRENT_TIMESTAMP,
gender CHAR(1),
FOREIGN KEY (hod_id) REFERENCES hod_db(id)
)
`

export const teacher_db =async()=>{


    try{

        await pool.query(sql)

        console.log(
            "teacher database is created now "
        )

    }catch(err){

        console.log(err) 

    }
}