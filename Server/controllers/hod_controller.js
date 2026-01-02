






// CRUD  OPERATION WITH TEACHERS


export const add_teacher = (res,req)=>{
    return res.send("hi add teacher")
}


export const update_teacher = (res,req)=>{
    return res.send("hi update teacher")
}



export const delete_teacher = (res,req)=>{
    return res.send("hi update teacher")
}



export const read_teacher = (res,req)=>{
    return res.send("hi read teacher")
}



// CRUD OPERATION WITH STUDENTS

export const add_student = (res,req)=>{
    return res.send("hi add student")
}
export const update_student = (res,req)=>{
    return res.send("hi read student")
}
export const delete_student = (res,req)=>{
    return res.send("hi read student")
}
export const read_student = (res,req)=>{
    return res.send("hi read student")
}



// CRUD OPERATION WITH COURSES

export const add_courses = (res,req)=>{
    return res.send("hi read courses")
}
export const update_courses = (res,req)=>{
    return res.send("hi read courses")
}
export const delete_courses = (res,req)=>{
    return res.send("hi read courses")
}
export const read_courses = (res,req)=>{
    return res.send("hi read courses")
}



//  CRUDE OPERATION WITH CLASSES

export const add_classes = (res,req)=>{
    return res.send("hi read CLASSES")
}
export const update_classes = (res,req)=>{
    return res.send("hi read CLASSES")
}
export const delete_classes = (res,req)=>{
    return res.send("hi read CLASSES")
}

export const read_classes = (res,req)=>{
    return res.send("hi read CLASSES")
}



//  CRUDE OPERATION WITH SUBJECT

export const add_subject = (res,req)=>{
    return res.send("hi read SUBJECT")
}

export const update_subject = (res,req)=>{
    return res.send("hi read SUBJECT")
}

export const delete_subject = (res,req)=>{
    return res.send("hi read SUBJECT")
}
export const read_subject = (res,req)=>{
    return res.send("hi read SUBJECT")
}


// ADDITIONAL FEATURE OF HOD

export const  add_teacher_to_subject_and_class = (res,req)=>{
    return res.send("hi read SUBJECT")
}


export const  update_teacher_to_subject_and_class = (res,req)=>{
    return res.send("hi read SUBJECT")
}
// showing all attendance of the 
export const show_all_attendance = (res,req)=>{
    return res.send("hi read SUBJECT")
}

// can download any attendance 

export const download_attendance = (req,res) =>{
return res.send("hi download ")
}


// Can see particular course attendancely score status

export const see_particular_course=(req,res)=>{
    return res.send("can see particular course score")
}

// Cane se particular class attendancely score

export const see_particular_class=(req,res)=>{
    return res.send("can see particular class score")
}
// Can see particular subject attendancely score status 

export const see_particular_subject=(req,res)=>{
    return res.send("can see particular subject score")
}
// Can see particular student attendancely score status

export const see_particular_student=(req,res)=>{
    return res.send("can see particular subject score")
}

// Can see particular student by class name

export const can_see_particular_class_student=(req,res)=>{
      return res.send("can see particular can_see_particular_class_student score")
}

// can see particular student class score
export const can_see_particular_class_student_scores=(req,res)=>{
      return res.send("can see particular  can_see_particular_class_student_scores")

}







