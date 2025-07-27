import React from 'react'
import {BrowserRouter, Routes, Route, Navigation, Navigate} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"

const Logout = () => {
  localStorage.clear()            // Ensure no old access tokens
  return <Navigate to="/login"/>
}

const RegisterAndLogout = () => {
  localStorage.clear()            // Ensure no old access tokens
  return <Register />
}

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      {/* Cannot access the Homepage without having an access token and it is valid*/}
      <Route path="/" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/login" element={<Logout />} />
      <Route path="/Register" element={<RegisterAndLogout />} />
      {/* Below is the 404 page */}
      <Route path="*" element={<NotFound />} />             
    </Routes>
    </BrowserRouter>
    
  )
}

export default App