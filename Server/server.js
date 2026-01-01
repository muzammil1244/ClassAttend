import express from "express"
import pool from "./connections/db_connent.js"

// routes
import auth_route from "./routes/auth_route.js"


// calling modules here

let app = express()




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



//  using routes here

app.use("/auth",auth_route)


app.get("/",(req,res)=>{
    res.send("hi muzammil")
})




// port and host

app.listen(8000,()=>console.log("server started at " + 8000))