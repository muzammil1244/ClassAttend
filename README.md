# 📘 ClassAttend – Attendance Management System

`` ClassAttend is a role-based attendance management system designed for colleges and educational institutes.
The main goal of this system is to make attendance digital, accurate, and transparent. ``

**The system works with three main roles:**

👨‍💼 HOD (Admin)

👩‍🏫 Teacher

👨‍🎓 Student 

*Each role has specific permissions, which helps keep the data secure and well-organized.*

## 🚀 Tech Stack
### <ins>  Frontend

1) React.js

2) JavaScript

30) Tailwind CSS

4) Redux Toolkit

5) Vite

### <ins> Backend

1) Node.js

2) Express.js

3) MySQL (TiDB Compatible)

4) JWT Authentication

``🔐 Role Based Access Control (RBAC)
Role	Description
HOD	Full system control and analytics
Teacher	Attendance and student management
Student	View attendance and analysis
👨‍💼 HOD Module (Admin Level)``


## 1️⃣ Authentication

Register HOD (POST)

Login HOD (POST)

## 2️⃣ Teacher Management (CRUD)

Create Teacher

Update Teacher

Delete Teacher

Read Teacher List

## 3️⃣ Student Management (CRUD)

Create Student

Update Student

Delete Student

Read Student Data

Assign Class ID and Roll Number

## 4️⃣ Course Management

Create Course (based on HOD ID)

Update Course

Delete Course

Read Course List

## 5️⃣ Class Management

Create Class (Course ID, Year, HOD ID, Class Teacher)

Update Class

Delete Class

Read Classes

## 6️⃣ Subject Management

Create Subject (Class ID and Course ID)

Update Subject

Delete Subject

Read Subject List

Assign Teacher to Subject

## 7️⃣ HOD Advanced Features

View current attendance (Class / Course / Subject)

Download daily attendance report

View course-wise score

View class-wise score

View subject-wise score

View student-wise performance

View all students by class

View complete score of a particular student

# 👩‍🏫 Teacher Module

## 1️⃣ Authentication

Teacher Login (POST)

## 2️⃣ Student Management

Create Student

Update Student

Delete Student

## 3️⃣ Attendance (Presenty) Management

Mark attendance (date-wise)

Attendance based on:

Class

Subject

Student

Course

Update attendance

Delete attendance

Read attendance records

Download attendance by date, class, and subject

 ## 4️⃣ Teacher Analytics

Student subject-wise score

Subject overall score

Read students by class

👨‍🎓 Student Module
 ## 1️⃣ Authentication

Student Login

 ## 2️⃣ Student Dashboard

View overall attendance score

View subject-wise attendance

View attendance history

Analyze subject performance

# 🗂️ Project File Structure

``ClassAttend

├── Client

│   ├── public

│   ├── src

│   │   ├── assets

│   │   ├── component

│   │   ├── pages

│   │   ├── redux

│   │   ├── role

│   │   ├── App.jsx

│   │   ├── main.jsx

│   │   └── index.css

│   └── package.json

│

├── Server

│   ├── connections

│   ├── controllers

│   ├── db

│   ├── middlewares

│   ├── routes

│   └── server.js

│

└── README.md``

# 🗄️ Database Design (High Level)

Main tables used in the project:

hods

teachers

students

courses

classes

subjects

attendance

roles

**Attendance is stored date-wise and subject-wise, which makes analysis easier**.

# ⚙️ Environment Variables

Create a .env file in the backend root folder:

``TIDB_URL=your_database_username_password_url``
``JWT_KEY=your_secret_key``
``PORT=8000``

  ## 🛠️ Installation & Setup
**Backend Setup**

``cd Server
npm install
npm run run ``

**Frontend Setup**

``cd Client
npm install
npm run dev ``

## 🔁 Application Flow
HOD

 ├── Create Course

 ├── Create Class

 ├── Create Subject

 ├── Assign Teacher

 └── Monitor Attendance

Teacher

 ├── Mark Attendance

 ├── Manage Students

 └── View Reports

Student

 └── View Attendance and Scores

🚧 Future Enhancements

📊 Dashboard with charts

📱 Mobile responsive UI

📄 PDF / Excel reports

🔔 Low attendance alerts

🏫 Multi-college support

📧 Email notifications

👨‍💻 Developer

M Muzammil

💻 Full Stack Developer (React + Node.js)

🚀 Building real-world scalable projects