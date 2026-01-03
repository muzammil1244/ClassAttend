import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const auth_middleware = (req,res,next)=>{

    let token = req.headers?.authorization

    if(!token){
        return res.send("token not found")
    }

    let filter_token = token.split(" ")[1]

    let decoded = jwt.verify(filter_token,process.env.JWT_key)

   req.user = {
    id:decoded.id,
    email:decoded.email
   }

   next()

}