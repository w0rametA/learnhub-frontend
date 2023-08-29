import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Create from './pages/Create'
import Content from './pages/Content'
import Edit from './pages/Edit'

function App() {
  return (
    <div>
      <div className="m-0 p-0 text-indigo-300 bg-orange-100">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/content/:id" element={<Content />} />
        <Route path="/content/${postId}/Edit" element={<Edit />} />
      </Routes>
    </div>
  )
}

export default App
