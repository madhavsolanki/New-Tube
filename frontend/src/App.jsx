import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/home'
import Video from './pages/Video'
import VideoUpload from './pages/VideoUpload'
import Profile from './pages/Profile'
import Signup from './pages/Signup'

import { useState } from 'react'

function App() {
  // state to manage the visibility of the side navbar
  const [sideNavbar, setSideNavbar] = useState(false)
  //function to update the side navbar
  const setSideNavbarfun = (value) => {
    setSideNavbar(value)
  }
  const [search, setSearch] = useState('');
  return (
    <div className="App">
      <Navbar setSideNavbarFunc = {setSideNavbarfun} sideNavbar={sideNavbar} setSearch = {setSearch} />
      <Routes>
        {/* Routes to define the application navigation */}
        <Route path='/' element={<Home sideNavbar={sideNavbar} search = {search} />}/>
        <Route path='/watch/:id' element={<Video sideNavbar={sideNavbar}/>}/>
        <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar}/>}/>
        <Route path='/:id/upload' element={<VideoUpload/>}/>
        <Route path='/:videoId/edit' element={<VideoUpload/>}/>
        <Route path='signup/' element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App
