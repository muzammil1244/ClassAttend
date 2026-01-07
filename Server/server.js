import express from "express"
import pool from "./connections/db_connent.js"


// routes
import auth_route from "./routes/auth_route.js"
import { hod_db } from "./db/hod_db.js"
import { auth_middleware } from "./middlewares/auth_middlware.js"
import { teacher_db } from "./db/teacher_db.js"
import {hod_route} from "./routes/hod_route.js"
import { courses } from "./db/coures_db.js"
import { classes_db } from "./db/classes_db.js"
import { subject_db } from "./db/subject_db.js"
import { class_subject_db } from "./db/class_subject_db.js"
// calling modules here

let app = express()

// middleware 

app.use(express.json())
app.use(express.urlencoded({ extended: true }));



// db connection function 

 const connection_fun = async() =>{

    try{

        let [data] = await pool.query("SELECT 'TiDB Connected Successfully 🎉' AS msg")
         console.log(data);


    }catch(err){
return console.log(err)
    }

}
connection_fun()

hod_db()
teacher_db()
courses()
classes_db()
subject_db()
class_subject_db()
//  using routes here

app.use("/auth",auth_route)
app.use("/hod",auth_middleware,hod_route)
app.get("/",auth_middleware,(req,res)=>{
    return res.send("server is stared")
})





// port and host

app.listen(8000,()=>console.log("server started at " + 8000))