
import  Register  from './pages/register'
import "./App.css"
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Hod_dash } from './pages/hod_dash'
import { Loging } from './pages/login'
function App() {

  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path='/login' element={<Loging/>}/>
       <Route path="/hod/dashboard" element={<Hod_dash />} />
    </Routes>
   
   </BrowserRouter>
   
  )
}

export default App
