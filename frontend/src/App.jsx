import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './Dashboard'
import { Button } from './components/ui/button'
import Navbar from './Navbar'
import Login from './Login'
import Register from './Register'
import CandidateTable from './CandidateTable'
import AddCandidate from './AddCandidate'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<CandidateTable/>}/>
          <Route path='/candidate/add' element={<AddCandidate/>}/>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
