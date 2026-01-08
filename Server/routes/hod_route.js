import express from "express"
import {
        add_classes, add_courses, add_student, add_subject, add_teacher,
        add_teacher_to_subject_and_class, delete_classes, delete_courses, delete_student,
        delete_subject, delete_teacher, download_attendance, read_classes, read_courses,
        read_student, read_subject, read_teacher, see_particular_class, see_particular_course,
        see_particular_student, see_particular_subject, show_all_attendance,
        update_classes, update_courses, update_student, update_teacher, update_teacher_to_subject_and_class
} from "../controllers/hod_controller.js"


export const hod_route = express.Router()
// CRUD OPERATION OF TEACHER

hod_route.post("/add/teacher", add_teacher)
hod_route.patch("/update/teacher/:id", update_teacher)
hod_route.delete("/delete/teacher/:id", delete_teacher)
hod_route.get("/read/teacher", read_teacher)

// CRUD OPERATION OF STUDENT

hod_route.post("/add/student", add_student)
hod_route.patch("/update/student/:id", update_student)
hod_route.delete("/delete/student/:id", delete_student)
hod_route.get("/read/student", read_student)

// CRUD OPERATION OF COURSES
hod_route.post("/add/course", add_courses)
hod_route.patch("/update/course/:id", update_courses)
hod_route.delete("/delete/course/:id", delete_courses)
hod_route.get("/read/course", read_courses)

// CRUD OPERATION OF CLASS

hod_route.post("/add/class/:id", add_classes)
hod_route.patch("/update/class/:id", update_classes)
hod_route.delete("/delete/class/:id", delete_classes)
hod_route.get("/read/class", read_classes)

// CRUD OPERATION OF CLASS

hod_route.post("/add/subject", add_subject)
hod_route.delete("/delete/subject/:id", delete_subject)
hod_route.get("/read/subject", read_subject)

// ADDITIONAL FEATURE OF HOD

hod_route.post("/add/teacher/subject", add_teacher_to_subject_and_class)
hod_route.patch("/update/teacher/subject/:id", update_teacher_to_subject_and_class)
hod_route.get("read/all/attendance", show_all_attendance)
hod_route.get("/download/attendance", download_attendance)
hod_route.get("/course/score", see_particular_course)
hod_route.get("/class/score", see_particular_class)
hod_route.get("/student/score", see_particular_student)
