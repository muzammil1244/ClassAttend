import express from "express"
import {
        add_classes, add_courses, add_student, add_subject, add_teacher,
         can_see_particular_class_student, delete_classes, delete_courses, delete_student,
        delete_subject, delete_teacher, download_attendance, filter_read_student, get_student_report, get_students_by_class, get_teacher_subject_by_class, profile, read_classes, read_courses,
        read_student, read_subject, read_subject_by_classID, read_teacher, see_particular_class, see_particular_course,
        see_particular_day_att,
        see_particular_student, see_particular_subject, show_all_attendance,
        sync_teacher_subject_assign,
        update_classes, update_courses, update_student, update_teacher
} from "../controllers/hod_controller.js"


export const hod_route = express.Router()
hod_route.get("/read/hod/profile",profile)// CRUD OPERATION OF TEACHER

hod_route.post("/add/teacher", add_teacher)
hod_route.patch("/update/teacher/:id", update_teacher)
hod_route.delete("/delete/teacher/:id", delete_teacher)
hod_route.get("/read/teacher", read_teacher)

// CRUD OPERATION OF STUDENT

hod_route.post("/add/student", add_student)
hod_route.patch("/update/student/:id", update_student)
hod_route.delete("/delete/student/:id", delete_student)
hod_route.get("/read/student", read_student)
hod_route.get("/filter/student",filter_read_student)
hod_route.get("/student/report",get_student_report)
hod_route.get("/student/:class/data",get_students_by_class)
// CRUD OPERATION OF COURSES
hod_route.post("/add/course", add_courses)
hod_route.patch("/update/course/:id", update_courses)
hod_route.delete("/delete/course/:id", delete_courses)
hod_route.get("/read/course", read_courses)

// CRUD OPERATION OF CLASS

hod_route.post("/add/class/:id", add_classes)
hod_route.patch("/update/class/:id", update_classes)
hod_route.delete("/delete/class/:id", delete_classes)
hod_route.get("/read/class/:course_id", read_classes)

// CRUD OPERATION OF Subjects

hod_route.post("/add/subject", add_subject)
hod_route.delete("/delete/subject/:id", delete_subject)
hod_route.get("/read/subject", read_subject)

// ADDITIONAL FEATURE OF HOD

hod_route.post("/add/teacher/subject", sync_teacher_subject_assign)
hod_route.get("/read/teacher/subject/:class_id", get_teacher_subject_by_class);

hod_route.get("/read/all/attendance/", show_all_attendance)
hod_route.get("/read/particular/attendance/:date/:sub", see_particular_day_att)
hod_route.get("/attendance/download/:date/:sub/:class", download_attendance)
hod_route.get("/course/score/:course/:date", see_particular_course)
hod_route.get("/class/score/:class/:course/:date", see_particular_class)
hod_route.get("/subject/score/:class/:course/:date", see_particular_subject)
hod_route.get("/score/subject/:student",can_see_particular_class_student)
hod_route.get("/student/score/:student/:roll_no", see_particular_student)
hod_route.get("/att/class/id/:class", read_subject_by_classID)
