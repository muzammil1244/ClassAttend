
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

export const subjects_score = (req,res)=>{

    try {

        let sql = `
        SELECT * FROM att_db
        WHERE 

        `
        
    } catch (error) {
        return res.status(500).json({
            message:"  error  from  subject  "
        })
    }
}
// kab aya or kab nahi bay attendance and teacher ne kin kin din attendance li wo 
export const attendance_record=(req,res)=>{
    return res.send("hi hello ")
}