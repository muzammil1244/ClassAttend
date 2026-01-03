import express from "express"
import { attendance_record, over_score, subjects_score } from "../controllers/student_controller"

student_route = express.Router()

student_route.get("/all/score",over_score)
student_route.get("/subject/score",subjects_score)
student_route.get("/attendance/data",attendance_record)