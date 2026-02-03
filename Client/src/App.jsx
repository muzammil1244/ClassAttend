
import  Register  from './pages/register'
import "./App.css"
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/register" element={<Register />} />
    </Routes>
   
   </BrowserRouter>
   
  )
}

export default App
