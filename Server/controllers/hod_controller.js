
import { rectSortingStrategy } from "@dnd-kit/sortable"
import pool from "../connections/db_connent.js"
import bcrypt from "bcrypt"





// CRUD  OPERATION WITH TEACHERS

export const profile = async (req, res) => {
    let hod_id = req.user?.id

    if (!hod_id) {
        return res.status(401).json({
            message: "hod id not found here "
        })
    }

    try {

        let sql = `
    SELECT *
    FROM hod_db h
    WHERE h.id = ?
    `

        let [result] = await pool.query(sql, [hod_id])

        if (result.length <= 0) {

            return res.status(200).json({
                message: "hod not found in database"
            })

        }

        return res.status(200).json({
            message: "data founded successfully",
            result
        })

    } catch (error) {
        return res.status(500).json({
            message: "error from hod profile ",
            error
        })
    }

}

export const add_teacher = async (req, res) => {
    let { email, password, name, gender, mobile_number } = req.body;

    try {
        if (!email || !password || !name || !gender || !mobile_number) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        let hod_id = req.user?.id;

        if (!hod_id) {
            return res.status(401).json({
                success: false,
                message: "HOD not authorized",
            });
        }

     

        let sql = `
      INSERT INTO teacher_db(email,password,name,gender,mobile_number,hod_id)
      VALUES(?,?,?,?,?,?)
    `;

        await pool.query(sql, [
            email,
            password,
            name,
            gender,
            mobile_number,
            hod_id,
        ]);

        return res.status(201).json({
            success: true,
            message: "Teacher added successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};



export const update_teacher = async (req, res) => {
    let teacher_id = req.params?.id

    if (!teacher_id) {
        return res.status(401).json({
            message: "teacher id required "
        })
    }

    const fields = req.body;


    try {

       

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

    let { email, password, name, roll_no, class_id } = req.body;

    if (!name || !roll_no || !class_id || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {

        // 🔐 hash password

        let sql = `
        INSERT INTO student_db(email,password,name,roll_no,class_id)
        VALUES(?,?,?,?,?)
        `;

        let [result] = await pool.query(sql, [
            email,
            password,
            name,
            roll_no,
            class_id
        ]);

        return res.status(200).json({
            message: "Student added successfully",
            result
        });

    } catch (error) {

        // duplicate email handle (UNIQUE constraint)
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        return res.status(500).json({
            message: "Add student error",
            error
        });
    }
};
export const update_student = async (req, res) => {

    const student_id = req.params.id;

    let { email, password, name, roll_no, class_id } = req.body;

    // ✅ same validation like add_student
    if (!student_id || !name || !roll_no || !class_id || !email) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {

        // ✅ check student exists
        const [check] = await pool.query(
            `SELECT * FROM student_db WHERE id = ?`,
            [student_id]
        );

        if (check.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        // ✅ if password sent → update password
        // ❗ if password empty → keep old password
        let sql;
        let values;

        if (password && password.trim() !== "") {

            sql = `
                UPDATE student_db
                SET email = ?, password = ?, name = ?, roll_no = ?, class_id = ?
                WHERE id = ?
            `;

            values = [email, password, name, roll_no, class_id, student_id];

        } else {

            sql = `
                UPDATE student_db
                SET email = ?, name = ?, roll_no = ?, class_id = ?
                WHERE id = ?
            `;

            values = [email, name, roll_no, class_id, student_id];
        }

        let [result] = await pool.query(sql, values);

        return res.status(200).json({
            message: "Student updated successfully",
            result
        });

    } catch (error) {

        // ✅ duplicate email handle (same as add)
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        return res.status(500).json({
            message: "Update student error",
            error: error.message
        });
    }
};


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

    const course_id = req.params?.id;
    const { class_name, class_year } = req.body;

    try {

        if (!course_id || !class_name || !class_year) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        /* ---------- INSERT ---------- */
        const insertSql = `
            INSERT INTO classes_db (class_name, class_year, course_id)
            VALUES (?, ?, ?)
        `;

        const [insertResult] = await pool.query(insertSql, [
            class_name,
            class_year,
            course_id
        ]);

        /* ---------- GET INSERTED ID ---------- */
        const insertedId = insertResult.insertId;

        /* ---------- FETCH FULL ROW ---------- */
        const selectSql = `
            SELECT * FROM classes_db WHERE id = ?
        `;

        const [rows] = await pool.query(selectSql, [insertedId]);

        /* ---------- RETURN CREATED DATA ---------- */
        return res.status(201).json({
            message: "Class created successfully",
            data: rows[0]   // 🔥 FULL OBJECT WITH ID
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error adding class",
            error: error.message
        });
    }
};

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
    let course_id = req.params?.course_id
    try {
        if (!hod_id) {
            return res.status(401).json({
                message: "hod id not found"
            })
        }

        let sql = `
SELECT cl.* ,c.name
FROM classes_db as cl
JOIN course_db c 
ON c.id = cl.course_id 
WHERE c.hod_id = ? AND  c.id= ?

`


        let [result] = await pool.query(sql, [hod_id, course_id])

        return res.status(200).json({
            message: "class read success",
            data: result
        })



    } catch (error) {
        return res.status(500).json({
            message: " read classes problem her ",
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

        let [data] = await pool.query(sql, [hod_id, subject_id])

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
    const assignments = req.body; // expecting array

    if (!Array.isArray(assignments) || assignments.length === 0) {
        return res.status(400).json({
            message: "Assignments array required"
        });
    }

    try {
        // Prepare values for bulk insert
        const values = assignments.map(item => [
            item.class_id,
            item.subject_id,
            item.teacher_id
        ]);

        const sql = `
            INSERT INTO class_subject_db (class_id, subject_id, teacher_id)
            VALUES ?
        `;

        const [data] = await pool.query(sql, [values]);

        return res.status(200).json({
            message: "Teachers + Subjects assigned successfully",
            insertedRows: data.affectedRows
        });

    } catch (error) {
        return res.status(500).json({
            message: "Bulk insert error",
            error: error.message
        });
    }
};




export const delete_teacher_subject_assign = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = `
        DELETE FROM class_subject_db

        WHERE class_id = ?
        `;

        const [data] = await pool.query(sql, [id]);
        return res.status(200).json({
            message: "Assignment deleted successfully",
            data
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting assignment",
            error

        });
    }
};


export const get_teacher_subject_by_class = async (req, res) => {
    const { class_id } = req.params;

    if (!class_id) {
        return res.status(400).json({
            message: "class_id is required"
        });
    }

    try {

        const sql = `
            SELECT 
                cs.id,
                cs.class_id,

                s.id AS subject_id,
                s.subject AS subject_name,

                t.id AS teacher_id,
                t.name AS teacher_name

            FROM class_subject_db cs

             JOIN subject_db s 
                ON s.id = cs.subject_id 

             JOIN teacher_db t 
                ON t.id = cs.teacher_id

            WHERE cs.class_id = ?
            ORDER BY s.subject ASC 
        `;

        const [data] = await pool.query(sql, [class_id]);

        return res.status(200).json({
            message: "Data fetched successfully",
            data: data
        });

    } catch (error) {
        return res.status(500).json({
            message: "Fetch error",
            error: error.message
        });
    }
};

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
    const courseID = Number(req.params.course)
    const classId = Number(req.params.class)
    const date = req.params.date

    try {

        const sql = `
        SELECT
            s.id AS subject_id,
            s.subject,
            t.id AS teacher_id,
            t.name AS name,

            COUNT(a.student_id) AS total_students,

            SUM(CASE WHEN a.status = 'P' THEN 1 ELSE 0 END) AS present_students,

            CASE 
                WHEN COUNT(a.student_id) = 0 THEN 0
                ELSE ROUND(
                    SUM(CASE WHEN a.status = 'P' THEN 1 ELSE 0 END)
                    / COUNT(a.student_id) * 100
                )
            END AS percentage

        FROM class_subject_db cs
        JOIN classes_db c ON c.id = cs.class_id
        JOIN course_db cr ON cr.id = c.course_id
        JOIN subject_db s ON s.id = cs.subject_id
        JOIN teacher_db t ON t.id = cs.teacher_id

        LEFT JOIN att_db a 
            ON a.class_id = cs.id
            AND a.att_date = ?

        WHERE cr.id = ?
        AND c.id = ?

        GROUP BY 
            s.id, s.subject, t.id, t.name
        `

        // ✅ Correct order
        const [result] = await pool.query(sql, [date, courseID, classId])

        return res.status(200).json({
            message: "subject wise attendance fetched successfully",
            data: result
        })

    } catch (err) {
        return res.status(500).json({
            message: "error from reading subject wise score",
            error: err.message
        })
    }
}


// Can see particular student attendancely score status class

export const see_particular_student = async (req, res) => {

    let student_id = req.params?.student
    let roll_no = req.params?.roll_no

    try {

        let sql = `
        SELECT 
            sb.id AS subject_id,
            sb.subject,

            COUNT(a.id) AS total_lectures,

            SUM(CASE WHEN a.status = 'P' THEN 1 ELSE 0 END) AS present_count,

            ROUND(
                IFNULL(
                    SUM(CASE WHEN a.status = 'P' THEN 1 ELSE 0 END) 
                    / NULLIF(COUNT(a.id),0) * 100,
                0),
            2) AS percentage

        FROM student_db s

        JOIN class_subject_db cs ON cs.class_id = s.class_id

        JOIN subject_db sb ON sb.id = cs.subject_id

        LEFT JOIN att_db a 
            ON a.subject_id = sb.id 
            AND a.student_id = s.id

        WHERE s.id = ? AND s.roll_no = ?

        GROUP BY sb.id, sb.subject
        `

        let [subjectWise] = await pool.query(sql, [student_id, roll_no])

        // ✅ overall calculate
        let total_att = 0
        let present_class = 0

        subjectWise.forEach(sub => {
            total_att += sub.total_lectures
            present_class += sub.present_count
        })

        let percentage = total_att === 0 ? 0 : ((present_class / total_att) * 100).toFixed(2)

        return res.status(200).json({
            message: "data collect successfully",
            overall: {
                total_att,
                present_class,
                percentage
            },
            subjects: subjectWise
        })

    } catch (error) {
        return res.status(500).json({
            message: "error from reading particular student",
            error
        })
    }
}



export const filter_read_student = async (req, res) => {

    let hod_id = req.user?.id
    let course_id = req.query?.course  
    let class_id = req.query?.class    
    let search = req.query?.search   

    if (!hod_id) {
        console.log("hod id not found her e")
    }

    console.log(hod_id)
    try {

        let sql = `
        SELECT 
    a.*,
    cl.id AS class_id,
    c.id AS course_id

FROM student_db a

JOIN classes_db cl ON cl.id = a.class_id
JOIN course_db c ON c.id = cl.course_id

-- HOD validation (important)
JOIN class_subject_db cs ON cs.class_id = cl.id
JOIN teacher_db t ON t.id = cs.teacher_id

WHERE t.hod_id = ?
        `

        let values = [hod_id]

        if (class_id) {
            sql += ` AND cl.id = ?`
            values.push(class_id)
        }

        if (course_id) {
            sql += ` AND c.id = ?`
            values.push(course_id)
        }

        if (search && search.trim() !== "") {
            sql += ` AND a.name LIKE ?`
            values.push(`%${search.trim()}%`)
        }

        sql += ` ORDER BY a.name ASC`


        let [result] = await pool.query(sql, values)

        return res.json({
            message: "Data fetched successfully",
            result
        })

    } catch (error) {
        return res.json({
            message: "Error fetching data",
            error
        })
    }
}



export const get_student_report = async (req, res) => {
    const { id, class_id, course_id } = req.query;

    if (!id || !class_id || !course_id) {
        return res.status(400).json({
            message: "roll_no, class_id, course_id required"
        });
    }

    try {

        // ✅ Get student basic info
        const studentSql = `
            SELECT id, name, roll_no , password
            FROM student_db
            WHERE id = ? 
        `;

        const [student] = await pool.query(studentSql, [id]);

        if (student.length === 0) {
            return res.status(404).json({ message: "Student not found first error" });
        }

        const student_id = student[0].id;

        // ✅ Overall Attendance
        const overallSql = `
            SELECT 
                COUNT(*) AS total_lectures,
                SUM(CASE WHEN status='P' THEN 1 ELSE 0 END) AS present,
                ROUND(
                    (SUM(CASE WHEN status='P' THEN 1 ELSE 0 END) / COUNT(*)) * 100,
                    2
                ) AS percentage
            FROM att_db
            WHERE student_id = ?
        `;

        const [overall] = await pool.query(overallSql, [student_id]);

        // ✅ Subject-wise Attendance
       const subjectSql = `
SELECT 
    sb.id AS subject_id,
    sb.subject,

    COUNT(a.id) AS total_lectures,

    SUM(CASE WHEN a.status = 'P' THEN 1 ELSE 0 END) AS present,

    ROUND(
        IFNULL(
            SUM(CASE WHEN a.status = 'P' THEN 1 ELSE 0 END)
            / NULLIF(COUNT(a.id),0) * 100,
        0),
    2) AS percentage

FROM student_db s

/* student's class subjects */
JOIN class_subject_db cs ON cs.class_id = s.class_id

JOIN subject_db sb ON sb.id = cs.subject_id

/* attendance optional */
LEFT JOIN att_db a 
    ON a.subject_id = sb.id
    AND a.student_id = s.id

WHERE s.id = ?

GROUP BY sb.id, sb.subject
ORDER BY sb.subject ASC
`;


        const [subjects] = await pool.query(subjectSql, [student_id]);

        return res.status(200).json({
            message: "Report generated",
            student: student[0],
            overall: overall[0],
            subjects
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error generating report",
            error
        });
    }
};


export const get_students_by_class = async (req, res) => {
    try {
        const hod_id = req.user?.id;          // token se
        const class_id = req.params?.class;

        if (!hod_id || !class_id) {
            return res.status(400).json({
                message: "HOD id and Class id required"
            });
        }

        let sql = `
      SELECT *
      FROM student_db s
      WHERE s.class_id = ?
      `

        let [result] = await pool.query(sql, [class_id])

        return res.status(200).json({
            message: "Students fetched successfully",
            result
        });

    } catch (error) {
        console.log("Fetch students error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// Can see particular student by class name

export const can_see_particular_class_student = async (req, res) => {

    let student_id = req.params?.student

    if (!student_id) {
        return res.status(401).json({
            message: "data not found here all field required "
        })
    }

    try {

        let sql = `
   SELECT 
    sb.id AS subject_id,
    sb.subject,

    COUNT(a.id) AS total_lectures,

    SUM(CASE WHEN a.status = 'P' THEN 1 ELSE 0 END) AS present_count,

    ROUND(
        (SUM(CASE WHEN a.status = 'P' THEN 1 ELSE 0 END) / COUNT(a.id)) * 100,
        2
    ) AS percentage

FROM att_db a

JOIN subject_db sb ON sb.id = a.subject_id

WHERE a.student_id = ?

GROUP BY a.subject_id, sb.subject


    `

        let [result] = await pool.query(sql, [student_id])

        return res.status(200).json({
            message: "data collected successfully",
            result
        })


    } catch (error) {

        return res.status(500).json({
            message: "err from reading score of  student base on subjects ",
            error
        })
    }

}

// can see particular student class score
export const can_see_particular_class_student_scoreq = (req, res) => {
    return req.send("can see particular  can_see_particular_class_student_scores")

}







