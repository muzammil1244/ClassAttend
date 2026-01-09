import express from "express"
import { add_student, create_attendance, delete_student, download_student_attendance, read_all_attendance, read_particular_attendance, read_student, see_particular_student_scores, teacher_classes, update_attendance, update_student } from "../controllers/teacher_controller.js"


export const teacher_route = express.Router()

// CRUD OPERATION

teacher_route.post("/add/student",add_student)
teacher_route.patch("/update/student",update_student)
teacher_route.delete("/delete/student",delete_student)
teacher_route.get("/red/student",read_student)

// ADDITIONAL FEATURE
teacher_route.get("/read/classes",teacher_classes)
teacher_route.post("/add/attendance",create_attendance)
teacher_route.post("/student/score",see_particular_student_scores)
teacher_route.get("/download/attendance",download_student_attendance)
teacher_route.patch("/update/attendance",update_attendance)
teacher_route.get("/read/all/attendance",read_all_attendance)
teacher_route.get("/read/particular/attendance",read_particular_attendance)