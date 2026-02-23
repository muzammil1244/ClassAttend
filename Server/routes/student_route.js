import express from "express"
import { all_over_score, attendance_record,    student_profile, subjects_score } from "../controllers/student_controller.js"

export const student_route = express.Router()
student_route.get("/all/score",all_over_score)
student_route.get("/subject/score",subjects_score)
student_route.get("/attendance/data",attendance_record)
student_route.get("/profile/data",student_profile)

