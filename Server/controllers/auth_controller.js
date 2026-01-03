import bcrypt from "bcrypt"
import pool from "../connections/db_connent.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


export const login = async (req, res) => {

    let { email, password, role } = req.body
    if (!email || !password || !role) {
        return res.json({ message: "all field required" })
    }

    if (role == "hod") {

        try {
            let sql = `SELECT * from hod_db WHERE email = ?`

            let [data] = await pool.query(sql, [email])
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
                email: data[0].email
            }

            let token = await jwt.sign(payload,process.env.JWT_key,{expiresIn:"1h"})

            if(!token){
                return res.status(500).json({
                    message:"token is not generated"
                })
            }





            return res.status(200).json({
                message: "now user is loged",
                token: token
            })
        } catch (err) {

            return res.status(500).json({
                message: err
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