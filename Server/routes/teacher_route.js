import express from "express"
import { create_attendance, download_student_attendance, profile, read_all_attendance, read_particular_attendance, read_student, see_particular_student_scores, see_particular_subject_score, teacher_classes, } from "../controllers/teacher_controller.js"
import { add_student, delete_student, update_student } from "../controllers/hod_controller.js"


export const teacher_route = express.Router()

// CRUD OPERATION
teacher_route.get("/profile",profile)
teacher_route.post("/add/student", add_student)
teacher_route.patch("/update/student/:id", update_student)
teacher_route.delete("/delete/student/:id", delete_student)
teacher_route.get("/read/student/:class", read_student)

// ADDITIONAL FEATURE
teacher_route.get("/read/classes", teacher_classes)
teacher_route.post("/add/attendance", create_attendance)
teacher_route.get("/student/score/:id/:sub", see_particular_student_scores)
teacher_route.get("/student/subject/score/:class/:sub", see_particular_subject_score)
teacher_route.get("/download/attendance", download_student_attendance)
teacher_route.get("/read/all/attendance/:sub/:class", read_all_attendance)
teacher_route.get("/read/particular/attendance/:sub/:class/:date", read_particular_attendance)