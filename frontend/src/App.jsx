import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from './home/home'
import Register from './register/register'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
