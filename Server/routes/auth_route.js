import express from  "express"


const auth_route = express.Router()

auth_route.get("/login",(req,res)=>{
    res.send("hi login ")
})



export default auth_route ;