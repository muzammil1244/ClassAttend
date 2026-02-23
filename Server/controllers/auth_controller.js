import bcrypt from "bcrypt"
import pool from "../connections/db_connent.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


export const login = async (req, res) => {

    let { email, password, role, student } = req.body
    if ( !role) {
        return res.json({ message: "role field required" })
    }

    if (role == "hod") {
 if (!email || !password || !role) {
        return res.json({ message: "all field required" })
    }
        try {
            let sql = `SELECT * from hod_db WHERE email = ?`

            let [data] = await pool.query(sql, [email])
           
if (data.length === 0) {
    return res.status(404).json({
        message: "Email not registered"
    })
}
            let stored_pass = data[0].pass

            // comparing work to password

            let is_user = await bcrypt.compare(password, stored_pass)

            if (!is_user) {
                return res.status(400).json({
                    message: "something wrong email or password"
                })
            }


            // jwt work 

            let payload = {
                id: data[0].id,
                email: data[0].email,
                role: "hod"
            }

            let token = await jwt.sign(payload,process.env.JWT_key,{expiresIn:"1h"})

            if(!token){
                return res.status(500).json({
                    message:"token is not generated"
                })
            }





            return res.status(200).json({
                message: "now user is logged",
                token: token
            })
        } catch (err) {

            return res.status(500).json({
                message: "the hod email is not registered ever"
            })
        }





    }if(role == "teacher"){
if (!email || !password || !role) {
        return res.json({ message: "all field required" })
    }

  try {
            let sql = `SELECT * from teacher_db WHERE email = ?`

            let [data] = await pool.query(sql, [email])

            
if (data.length === 0) {
    return res.status(404).json({
        message: "Email not registered"
    })
}
            let stored_pass = data[0].password

            // comparing work to password


            if (stored_pass !== password) {
                return res.status(400).json({
                    message: "something wrong email or password"
                })
            }


            // jwt work 

            let payload = {
                id: data[0].id,
                email: data[0].email,
                role: "teacher"
            }

            let token = await jwt.sign(payload,process.env.JWT_key,{expiresIn:"1h"})

            if(!token){
                return res.status(500).json({
                    message:"token is not generated"
                })
            }





            return res.status(200).json({
                message: "now teacher is logged",
                token: token
            })
        } catch (err) {

            return res.status(500).json({
              message:"this email is not registered with this account"
            })
        }



    }if(role == "student"){

try {
if(!email,!password){
    return res.status(401).json({
        message:"all field required for  student  data "
    })
}

let sql = `
SELECT * from student_db
WHERE email = ? AND password = ? 
`

let [result] = await pool.query(sql,[email,password])

if(result.length == 0){
    return res.status(401).json({
        message:"student not found ",
        result
    })
}

  let payload = {
                id: result[0].id,
                name: result[0].name,
                 roll_no: result[0].roll_no,
                 class_id:result[0].class_id,
                  role: "student"
            }

            let token = await jwt.sign(payload,process.env.JWT_key,{expiresIn:"1h"})

            if(!token){
                return res.status(500).json({
                    message:"token is not generated"
                })
            }
 return res.status(200).json({
                message: "now student is logged",
                token: token
            })
    
} catch (error) {
    return res.status(500).json({
        message:"error from login to student",
    error
        
    })
}


    }



}



export const register = async (req, res) => {
    let { email, password, name, department } = req.body

    if (!email || !password || !name || !department) {
        return res.status(400).send("all field require")
    }
    try {
        let saltRounds = 10

        let get_salt = await bcrypt.genSalt(saltRounds)

        let salted_pass = await bcrypt.hash(password, get_salt)

        let sql = `INSERT INTO hod_db(email,name,pass,department_name) VALUES (?,?,?,?) `

        let [result] = await pool.query(sql, [email, name, salted_pass, department])

        res.status(200).json({
            message: "HOD registered successfully",
            id: result.insertId
        })

    } catch (err) {

        return res.status(500).json({
            message: err
        })
    }





}