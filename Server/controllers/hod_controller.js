
import { rectSortingStrategy } from "@dnd-kit/sortable"
import pool from "../connections/db_connent.js"
import bcrypt from "bcrypt"





// CRUD  OPERATION WITH TEACHERS


export const add_teacher = async (req, res) => {

    let { email, password, name, gender, mobile_number } = req.body
    try {




        if (!email || !password || !name || !gender || !mobile_number) {
            return res.send(" all field required for adding teacher ")
        }

        let salt = 10
        let get_salt_round = await bcrypt.genSalt(salt)
        let salted_password = await bcrypt.hash(password, get_salt_round)


        let hod_id = req.user?.id

        if (!hod_id) {
            return res.send("hod id not found here")
        }


        let slq = `
        INSERT INTO teacher_db(email,password,name,gender,mobile_number,hod_id) VALUES(?,?,?,?,?,?)
        `
        await pool.query(slq, [email, salted_password, name, gender, mobile_number, hod_id])

        return res.send("teacher data have submitted")


    } catch (error) {

    }


}


export const update_teacher = async (req, res) => {
    let teacher_id = req.params?.id

    if (!teacher_id) {
        return res.status(401).json({
            message: "teacher id required "
        })
    }

    const fields = req.body;


    try {

        if (fields.password) {

            let salt = 10
            let salted_round = await bcrypt.genSalt(salt)
            fields.password = await bcrypt.hash(fields.password, salted_round)




        }

        let updates = []
        let values = []

        for (let key in req.body) {

            updates.push(`${key}=?`)
            values.push(fields[key])


        }

        let sql = `
      UPDATE teacher_db
      SET ${updates.join(", ")}
      WHERE id=?
      `

        values.push(teacher_id)

        let data = await pool.query(sql, values, () => {
            return res.status(200).json({
                message: "teacher is updated "
            })
        })
        console.log(data)

    } catch (err) {
        return res.status(400).json({
            message: "update teacher err",
            err
        })
    }






}



export const delete_teacher = async (req, res) => {
    let delete_id = req.params?.id

    if (!delete_id) {
        return res.status(400).json({
            message: "teacher id not found for deleting "
        })
    }







    try {




        let sql = `
DELETE FROM teacher_db WHERE id =?
`


        let [data] = await pool.query(sql, [delete_id])

        if (data.affectedRows === 0) {
            {

                return res.status(400).json({
                    message: "data is already empty"
                })
            }
        }

        return res.status(200).json({
            message: "data is deleted",
            data
        })


    } catch (err) {

        return res.status(500).json({
            message: "teacher delete error",
            err
        })


    }


}



export const read_teacher = async (req, res) => {

    let hod_id = req.user?.id
    if (!hod_id) {
        return res.status(401).json({
            message: "hod_id not found here "
        })
    }


    try {
        let sql = `
    SELECT * FROM teacher_db WHERE hod_id =?
    `
        let [data] = await pool.query(sql, [hod_id])

        return res.status(200).json({
            message: "hod read the all teacher",
            data
        })

    } catch (error) {

    }

}



// CRUD OPERATION WITH STUDENTS

export const add_student = async (req, res) => {

    let {
        name,
        roll_no,
        class_id
    } = req.body

    if (!name || !roll_no || !class_id) {

        return res.status(401).json({
            message: "all field are required "
        })
    }

    let sql = `
    INSERT INTO student_db(name,roll_no,class_id) VALUES(?,?,?)
    `

    try {

        let [result] = await pool.query(sql, [name, roll_no, class_id])

        return res.status(200).json({
            message: "student added successfully",
            result
        })
    } catch (error) {
        return res.status(500).json({
            message: "add student error",
            error
        })
    }
}
export const update_student = async (req, res) => {
    let student_id = req.params?.id
    let {
        name,
        roll_no,
        class_id
    } = req.body

    if (!name || !roll_no || !class_id) {

        return res.status(401).json({
            message: "all field are required "
        })
    }
    try {


        let sql = `
    UPDATE student_db
    SET name =?,
      roll_no =?,
    class_id =?

    WHERE id = ?

    `

        let [result] = await pool.query(sql, [name, roll_no, class_id, student_id])

        return res.status(401).json({
            message: "student updated successfully",
            data: result
        })

    } catch (error) {

        return res.status(500).json({
            message: "student read error",
            error
        })

    }




}

export const delete_student = async (req, res) => {

    let student_id = req.params?.id

    let sql = `
    DELETE FROM student_db
    WHERE id = ?
    `
    try {

        let result = await pool.query(sql, [student_id])

        return res.status(200).json({
            message: "student delete successfully",
            result
        })
    } catch (error) {
        return res.status(500).json({
            message: "student delete error"
        })
    }
}

export const read_student = async (req, res) => {

    let hod_id = req.user?.id;

    if (!hod_id) {
        return res.status(401).json({
            message: "HOD id not found"
        });
    }

    try {

        let sql = `
      SELECT s.* 
      FROM student_db s
      JOIN classes_db c ON s.class_id = c.id
      JOIN course_db co ON c.course_id = co.id
      WHERE co.hod_id = ?
    `;

        let [result] = await pool.query(sql, [hod_id]);

        return res.status(200).json({
            message: "read student successfully",
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            message: "read error for read student",
            error
        });
    }
};




// CRUD OPERATION WITH COURSES

export const add_courses = async (req, res) => {
    let { course_name } = req.body
    let hod_id = req.user?.id
    if (!hod_id || !course_name) {
        console.log(course_name, hod_id)
        return res.status(401).json({
            message: "all field required for add course"
        })

    }
    try {

        let sql = `
        
        INSERT INTO course_db(name,hod_id) VALUES(?,?)

        `

        let data = await pool.query(sql, [course_name, hod_id])

        return res.status(200).json({
            data
        })
    } catch (error) {
        return res.status(500).json({
            message: "add course err from hod "
        })
    }
}

export const update_courses = async (req, res) => {
    let { course_name } = req.body
    let course_id = req.params?.id
    try {
        if (!course_id) {
            return res.status(400).json({
                message: "course id required"
            });
        }

        if (!course_name) {
            return res.status(400).json({
                message: "course name required"
            });
        }


        let sql = `
        UPDATE course_db
        SET name=?
        WHERE id=?
        `
        const [result] = await pool.query(sql, [course_name, course_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "course not found"
            });
        }
        return res.status(200).json({
            message: "course updated",
            result
        })
    } catch (error) {
        return res.status(500).json({
            message: "update error problem from hod "
        })
    }

}
export const delete_courses = async (req, res) => {

    let course_id = req.params?.id

    let sql = `
    DELETE FROM course_db WHERE id = ?
    `



    try {

        if (!course_id) {
            return res.status(401).json({
                message: "course id not found here for delete "
            })
        }


        let [result] = await pool.query(sql, [course_id])

        return res.status(200).json({
            message: "course deleted ",
            result
        })

    } catch (err) {
        return res.status(500).json({
            message: "delete course err",
            err
        })
    }
}
export const read_courses = async (req, res) => {

    let hod_id = req.user?.id

    if (!hod_id) {
        return res.json({
            message: "hod id not found here "
        })
    }

    try {

        let sql = `
SELECT * FROM course_db WHERE hod_id = ?
`


        let result = await pool.query(sql, [hod_id])

        return res.status(200).json({
            message: "hod read course success",
            data: result[0]
        })

    } catch (err) {

        return res.status(500).json({
            message: "hod read problem from course"
        })

    }

}



//  CRUDE OPERATION WITH CLASSES

export const add_classes = async (req, res) => {

    let course_id = req.params?.id
    let {
        class_name,
        class_year
    } = req.body


    try {

        if (!course_id) {
            return res.status(401).json({
                message: "course id not found "
            })
        }
        let sql = `
INSERT INTO classes_db(class_name,class_year,course_id) VALUES(?,?,?)
`

        let [result] = await pool.query(sql, [class_name, class_year, course_id])

        return res.status(200).json({
            message: "data collected",
            data: result[0]
        })

    } catch (error) {

        return res.status(500).json({
            message: "error from hod add classes",
            error
        })
    }


}
export const update_classes = async (req, res) => {

    let update_course_id = req.params?.id
    let { class_name, class_year } = req.body
    if (!update_course_id) {
        return res.status(401).json({
            message: "course update id not found here"
        })
    }


    try {

        let sql = `
UPDATE  classes_db
set class_name = ?, class_year=?
WHERE id=?
`

        let [result] = await pool.query(sql, [class_name, class_year, update_course_id])

        return res.status(200).json({
            message: "data collected",
            data: result[0]
        })


    } catch (error) {
        return res.status(500).json({
            message: "err from the updata classes",
            error
        })
    }
}
export const delete_classes = async (req, res) => {

    let delete_course_id = req.params?.id

    if (!delete_course_id) {
        return res.status(401).json({
            message: "delete id not found for delete course "
        })
    }

    try {

        let sql = `
    DELETE FROM classes_db WHERE id=?
    `

        let [data] = await pool.query(sql, [delete_course_id])
        return res.status(200).json({
            message: "class have deleted ",
            data: data[0]
        })
    } catch (error) {
        return res.status(500).json({
            message: "err from the delete class",
            error
        })
    }

}

export const read_classes = async (req, res) => {

    let hod_id = req.user?.id

    try {
        if (!hod_id) {
            return res.status(401).json({
                message: "hod id not found"
            })
        }

        let sql = `
SELECT cl.* 
FROM classes_db as cl
JOIN course_db c 
ON cl.course_id = c.id
WHERE c.hod_id = ?

`

        let [result] = await pool.query(sql, [hod_id])

        return res.status(200).json({
            message: "class read success",
            data: result
        })



    } catch (error) {
        return res.status(500).json({
            message: " read classes problme her ",
            error
        })
    }






}



//  CRUDE OPERATION WITH SUBJECT

export const add_subject = async (req, res) => {
    let hod_id = req.user?.id
    let { sub_name } = req.body
    try {

        if (!sub_name || !hod_id) {
            return res.status(401).json({
                message: "all filed require"
            })
        }


        let sql = `
INSERT INTO subject_db(subject,hod_id) VALUES(?,?)
`
        let [data] = await pool.query(sql, [sub_name, hod_id])

        return res.status(200).json({
            message: "subject added successfully",
            data: data
        })

    } catch (error) {
        return res.status(500).json({
            message: "err from add subject",
            error

        })
    }


}



export const delete_subject = async (req, res) => {

    let hod_id = req.user?.id
    let subject_id = req.params?.id

    try {

        let sql = `
        DELETE FROM  subject_db 
        WHERE hod_id = ? AND id = ?
        `

        let [data] = await pool.sql(sql, [hod_id, subject_id])

        return res.status(200).json({
            message: "subject delete successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            message: "delete subject id err ",
            error
        })
    }

}
export const read_subject = async (req, res) => {

    let hod_id = req.user?.id
    if (!hod_id) {
        return res.status(401).json({
            message: "hod id not founded here for the read"
        })
    }

    try {

        let sql = `
        SELECT * FROM subject_db 
        WHERE hod_id = ?
        `

        let [data] = await pool.query(sql, [hod_id])

        return res.status(200).json({
            message: "subjects read successfully ",
            data: data
        })



    } catch (error) {

        return res.status(500).json({
            message: "read err subject",
            error
        })

    }


}


// ADDITIONAL FEATURE OF HOD

export const add_teacher_to_subject_and_class = async (req, res) => {

    let { classes, subject, teacher } = req.body

    let sql = `
    INSERT INTO class_subject_db(class_id,subject_id,teacher_id) VALUES(?,?,?)
    `
    try {

        let [data] = await pool.query(sql, [classes, subject, teacher])

        return res.status(200).json({
            message: " add teacher classes and subjects successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            message: "add class ans subject to teacher errr",
            error
        })
    }
}


export const update_teacher_to_subject_and_class = async (req, res) => {

    let c_s_id = req.params?.id
    let { classes, subject, teacher } = req.body
    if (!classes || !subject || !teacher) {

        return res.status(401).json({
            message: "all field required",
        })
    }
    try {

        let sql = `
        UPDATE class_subject_db
        SET class_id = ? , subject_id=? ,  teacher_id=?
        WHERE id=?
        `
        let [data] = await pool.query(sql, [classes, subject, teacher, c_s_id])

        return res.status(200).json({
            message: "update subject class teacher successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            message: " updata classes subject id error",
            error
        })
    }


}
// showing all attendance of the 
export const show_all_attendance = async (req, res) => {
    let hod_id = req.user?.id
    let class_id = req.params?.class
    let subject_id = req.params?.sub

    if (!hod_id || !class_id || !subject_id) {
        return res.status(401).json({
            message: "hod id not found here "
        })
    }

    try {

        let sql = `
    SELECT
    att_date AS DATE,
    COUNT(*) AS total_student,
    SUM(CASE WHEN status = "P" THEN 1 ELSE 0 END) AS present_student
    FROM att_db 
WHERE class_id  = ? AND subject_id = ?
GROUP BY att_date
    

    `
        let [result] = await pool.query(sql, [class_id, subject_id])

        return res.status(200).json({
            message: "data collect successfully",
            data: result
        })

    } catch (error) {
        return res.status(500).json({
            message: "error from hod show all attendance",
            error
        })
    }

}

export const see_particular_day_att = async (req, res) => {

    let date = req.params?.date
    let subject_id = req.params?.sub
    let class_id = req.params?.class

    if (!date || !subject_id || !class_id) {
        return res.status(401).json({
            message: "all field is required "
        })
    }

    try {

        let sql = `
        SELECT
        s.roll_no , s.name , a.status , a.att_date

        FROM att_db a 
        JOIN student_db s ON s.id = a.student_id
        WHERE subject_id = ? AND att_date = ? AND class_id = ?
        ORDER BY s.roll_no
        `

        let [result] = await pool.query(sql, [subject_id, date, class_id])

        return res.status(200).json({
            message: "all data collect successfully",
            result
        })
    } catch (error) {
        return res.status(500).json({
            message: "err from reading date attend",
            error
        })
    }
}

// can download any attendance 

export const download_attendance = async (req, res) => {

    let date = req.params?.date
    let subject_id = req.params?.sub
    let class_id = req.params?.class
    if (!date || !subject_id || !class_id) {
        return res.stat(401).json({
            message: "all field is required "
        })
    }

    try {

        let sql = `
        SELECT
        s.roll_no , s.name , a.status , a.att_date

        FROM att_db a 
        JOIN student_db s ON s.id = a.student_id
        WHERE subject_id = ? AND att_date = ? AND class_id = ?
        ORDER BY s.roll_no
        `

        let [result] = await pool.query(sql, [subject_id, date, class_id])

        return res.status(200).json({
            message: "all data collect successfully",
            result
        })
    } catch (error) {
        return res.status(500).json({
            message: "err from reading date attend",
            error
        })
    }
}


// Can see particular course attendancely score status

export const see_particular_course = async (req, res) => {

    let course_id = req.params?.course
    let date = req.params?.date

    if (!course_id || !date) {
        return res.status(401).json({
            message: "all field required"
        })
    }

    try {

        let sql = `

SELECT 

COUNT(*) AS total_student,
SUM(CASE WHEN status = "P" THEN 1 ELSE 0 END) AS present_student,
ROUND(
SUM(CASE WHEN status = "P" THEN 1 ELSE 0 END) / COUNT(*)  * 100
) AS percentage
FROM att_db a
JOIN class_subject_db cs ON cs.id = a.class_id
JOIN classes_db c ON c.id = cs.class_id
WHERE c.course_id = ? AND a.att_date = ?


`

        let [result] = await pool.query(sql, [course_id, date])

        return res.status(200).json({
            message: "data collected successfully",
            result
        })
    } catch (error) {
        return res.status(500).json({
            message: "err from the see particular crouse  score  ",
            error
        })
    }

}

// Cane se particular class attendancely score

export const see_particular_class = async (req, res) => {

    let course_id = req.params?.course
    let class_id = req.params?.class
    let date = req.params?.date
    try {

        let sql = `
        SELECT
        COUNT(*) AS total_student,
        SUM(CASE WHEN a.status = "P" THEN 1 ELSE 0 END) AS present_student,
ROUND(
SUM(CASE WHEN a.status = "P" THEN 1 ELSE 0 END)/COUNT(*)*100
) AS percentage
    FROM att_db a
        JOIN class_subject_db cs ON cs.id = a.class_id
        JOIN classes_db c ON c.id = cs.class_id
        JOIN course_db cr ON cr.id = c.course_id
        WHERE cr.id = ? AND c.id = ? AND a.att_date = ?
       
        `

        let [result] = await pool.query(sql, [course_id, class_id, date])

        return res.status(200).json({
            message: "data collected successfully",
            result
        })

    } catch (error) {
        return res.status(500).json({
            message: "error from see particular class  scores",
            error
        })
    }


}
// Can see particular subject attendancely score status 

export const see_particular_subject = async (req, res) => {
    let course_id = req.params?.course
    let class_id = req.params?.class
    let date = req.params?.date
    let subject_id = req.params?.sub
    try {

        let sql = `
        SELECT
        COUNT(*) AS total_student,
        SUM(CASE WHEN a.status = "P" THEN 1 ELSE 0 END) AS present_student,
ROUND(
SUM(CASE WHEN a.status = "P" THEN 1 ELSE 0 END)/COUNT(*)*100
) AS percentage
    FROM att_db a
        JOIN class_subject_db cs ON cs.id = a.class_id
        JOIN classes_db c ON c.id = cs.class_id
        JOIN course_db cr ON cr.id = c.course_id
        WHERE cr.id = ? AND c.id = ? AND a.att_date = ? AND a.subject_id = ? 
       
        `

        let [result] = await pool.query(sql, [course_id, class_id, date, subject_id])

        return res.status(200).json({
            message: "data collected successfully",
            result
        })

    } catch (err) {
        return res.status(500).json({
            message: "error from reading subject wise score ",
            err
        })
    }
}
// Can see particular student attendancely score status

export const see_particular_student = async (req, res) => {
    let student_id = req.params?.student
    let roll_no = req.params?.roll_no

    try {


        let sql = `
        SELECT COUNT(*) AS total_att,
        SUM(CASE WHEN a.status = "P" THEN 1 ELSE 0 END) AS present_class,
        ROUND(
SUM(CASE WHEN a.status = "P" THEN 1 ELSE 0 END)/COUNT(*)*100 
              ) AS percentage
    
        FROM att_db a
        JOIN student_db s ON s.id=a.student_id
        JOIN class
    WHERE a.student_id = ? AND s.roll_no = ?

        `


        let [result] = await pool.query(sql,[student_id,roll_no])

        return res.status(200).json({
            message:"data collect successfully",
            result
        })
    } catch (error) {
        return res.status(500).json({
            message: "error from reading particular  student ",
            error
        })
    }

}

// Can see particular student by class name

export const can_see_particular_class_student = async (req,res) => {

    let student_id = req.params?.student
    
    if(!student_id){
        return res.status(401).json({
            message:"data not found here all field required "
        })
    }

 try {

    let sql = `
   SELECT a.id
   FROM att_db a
   WHERE a.student_id = ?
    `
    
let [result] = await pool.query(sql,[student_id])

return res.status.json({
    message:"data collected successfully",
 result
})


 }catch (error) {
    
    return res.status(500).json({
        message:"err from reading score of  student base on subjects ",
        error
    })
 }

}

// can see particular student class score
export const can_see_particular_class_student_scoreq = (req, res) => {
    return req.send("can see particular  can_see_particular_class_student_scores")

}







