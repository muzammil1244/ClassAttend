
import Register from './pages/register'
import "./App.css"
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Hod_dash } from './pages/hod_dash'
import { Loging } from './pages/login'
import { Create_Classes } from './role/hod/create_class'
import { Teacher_dash } from './pages/teacher_dash'
function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/teacher/dashboard" element={<Teacher_dash />} />

        <Route path="/hod/dashboard" element={<Hod_dash />} />

        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Loging />} />
      </Routes>

    </BrowserRouter>

  )
}

export default App
