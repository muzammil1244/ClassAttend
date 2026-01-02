import express from  "express"
import { login, register } from "../controllers/auth_controller.js";


const auth_route = express.Router()

auth_route.post("/login",login)
auth_route.post("/register",register)



export default auth_route ;