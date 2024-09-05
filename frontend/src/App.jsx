import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './Dashboard'
import Navbar from './Navbar'
import Login from './Login'
import Register from './Register'
import CandidateTable from './CandidateTable'
import AddCandidate from './AddCandidate'
import Home from './Home'
import { Toaster } from './components/ui/sonner'
import PageNotFound from './PageNotFound'


function App() {

  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/register' element={<Register />} />
          <Route path='/candidates' element={<CandidateTable />} />
          <Route path='/candidate/add' element={<AddCandidate />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
