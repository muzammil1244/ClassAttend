
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

export const add_student = (res, req) => {
    return res.send("hi add student")
}
export const update_student = (res, req) => {
    return res.send("hi read student")
}
export const delete_student = (res, req) => {
    return res.send("hi read student")
}
export const read_student = (res, req) => {
    return res.send("hi read student")
}



// CRUD OPERATION WITH COURSES

export const add_courses = async (req, res) => {
    let { course_name } = req.body
    let hod_id = req.user?.id
 if(!hod_id || !course_name){
console.log(course_name,hod_id)
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

export const update_courses =async (req,res) => {
    let {course_name} = req.body
let course_id  = req.params?.id
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
    message:"course updated",
    result
})
    } catch (error) {
        return res.status(500).json({
            message:"update error problem from hod "
        })
    }

}
export const delete_courses = (res, req) => {
    return res.send("hi read courses")
}
export const read_courses = (res, req) => {
    return res.send("hi read courses")
}



//  CRUDE OPERATION WITH CLASSES

export const add_classes = (res, req) => {
    return res.send("hi read CLASSES")
}
export const update_classes = (res, req) => {
    return res.send("hi read CLASSES")
}
export const delete_classes = (res, req) => {
    return res.send("hi read CLASSES")
}

export const read_classes = (res, req) => {
    return res.send("hi read CLASSES")
}



//  CRUDE OPERATION WITH SUBJECT

export const add_subject = (res, req) => {
    return res.send("hi read SUBJECT")
}

export const update_subject = (res, req) => {
    return res.send("hi read SUBJECT")
}

export const delete_subject = (res, req) => {
    return res.send("hi read SUBJECT")
}
export const read_subject = (res, req) => {
    return res.send("hi read SUBJECT")
}


// ADDITIONAL FEATURE OF HOD

export const add_teacher_to_subject_and_class = (res, req) => {
    return res.send("hi read SUBJECT")
}


export const update_teacher_to_subject_and_class = (res, req) => {
    return res.send("hi read SUBJECT")
}
// showing all attendance of the 
export const show_all_attendance = (res, req) => {
    return res.send("hi read SUBJECT")
}

// can download any attendance 

export const download_attendance = (req, res) => {
    return res.send("hi download ")
}


// Can see particular course attendancely score status

export const see_particular_course = (req, res) => {
    return res.send("can see particular course score")
}

// Cane se particular class attendancely score

export const see_particular_class = (req, res) => {
    return res.send("can see particular class score")
}
// Can see particular subject attendancely score status 

export const see_particular_subject = (req, res) => {
    return res.send("can see particular subject score")
}
// Can see particular student attendancely score status

export const see_particular_student = (req, res) => {
    return res.send("can see particular subject score")
}

// Can see particular student by class name

export const can_see_particular_class_student = (req, res) => {
    return res.send("can see particular can_see_particular_class_student score")
}

// can see particular student class score
export const can_see_particular_class_student_scores = (req, res) => {
    return res.send("can see particular  can_see_particular_class_student_scores")

}







