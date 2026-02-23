
import pool from "../connections/db_connent.js"




export const all_over_score =async (req,res)=>{

    let user_id = req.user?.id
let class_id = req.user?.class_id
    if(!user_id || !class_id){
        return res.status(401).json({
            message:"user not found here"
        })
    }
let sql = `
    SELECT 
 (SUM(CASE WHEN status='P' THEN 1 ELSE 0 END) * 100.0) / COUNT(*) 
   AS overall_percentage
FROM att_db
WHERE student_id = ? AND class_id = ?
    `
    try {
        

        let [result] = await pool.query(sql,[user_id,class_id])

if(result.length == 0){
    return res.status(200)
.json({
    message:"data not found",
    result
})}


return res.status(200).json({
    message:"data collect successfully",
     result
})

    } catch (error) {
        return res.status(500).json({
            message:"error from the all over score of student",
            error
        })
    }

    
}


export const subjects_score =async (req, res) => {

    let student_id = req.user?.id

    if (!student_id) {
        return res.status(401).json({
            message: "student not found"
        })
    }

    try {

        let sql = `
        SELECT 
            s.id AS subject_id,
            s.subject AS subject_name,
            COUNT(a.id) AS total_lectures,
            SUM(CASE WHEN a.status = 'P' THEN 1 ELSE 0 END) AS present_count,
            ROUND(
                (SUM(CASE WHEN a.status = 'P' THEN 1 ELSE 0 END) / COUNT(a.id)) * 100,
                2
            ) AS percentage
        FROM att_db a
        JOIN subject_db s ON s.id = a.subject_id
        WHERE a.student_id = ?
        GROUP BY a.subject_id
        `

  let [result] =    await  pool.query(sql, [student_id])

            return res.status(200).json({
                message: "subject wise attendance",
                data: result
            })
       

    } catch (error) {
        return res.status(500).json({
            message: "server error",
            error
        })
    }
}

// kab aya or kab nahi bay attendance and teacher ne kin kin din attendance li wo 
export const attendance_record=async(req,res)=>{
 
    let student_id = req.user?.id

    if(!student_id){
        return res.status(401).json({
            message:"student id not found here "
        })
    }

    try {

        let sql = `
        
        SELECT  
      a.status , a.att_date, s.subject
        FROM att_db a
        JOIN subject_db s ON  s.id = a.subject_id
        WHERE student_id = ?
        ORDER BY att_date


        `

        let [result] = await pool.query(sql,[student_id])
        
 return res.status(200).json({
    message:"data collected  successfully",
    result
 })

    } catch (error) {
        return res.status(500).json({
            message:"error from reading att by student",
            error
        })
    }

}

export const student_profile = async (req, res) => {
  const student_id = req.user?.id;
  if(!student_id){

    return res.status(401).json({
        message:" student id not found here "
    })
  }

  try {
    const sql = `
      SELECT 
        s.name AS name,
        s.email AS email,
        s.roll_no AS roll_no,
        c.class_name AS class_name,
        cs.name AS course_name
      FROM student_db s
      JOIN classes_db c ON c.id = s.class_id
      JOIN course_db cs ON cs.id = c.course_id
      WHERE s.id = ?
    `;

    const [result] = await pool.query(sql, [student_id]);

    return res.status(200).json({
      message: "profile data collected successfully",
      result: result || null
    });

  } catch (error) {
    return res.status(500).json({
      message: "error from student profile",
      error
    });
  }
};
