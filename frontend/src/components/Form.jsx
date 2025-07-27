import React from 'react'
import { useState } from 'react'
import api from "../api"
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import "../styles/Form.css"

// Route is submission route, method register or login 
const Form = ({route, method}) => {

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"
    
    // Dont want to reload the form 
    const handleSubmit = async (e) => {
        setloading(true)
        e.preventDefault()

        try {

            // Send the username and password dynamically typed by the User
            const response = await api.post(route, {username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
                navigate("/")           // Now navigates to the homepage
            } else {
                navigate("/login")
            }
            
        } catch (error) {
            alert(error)        // Just display on the screen 
            
        } finally {
            setloading(false)
        }
    }


    // Dynamic form which changes based on registering or login
    
  return (
    <div>
        <form onsubmit={handleSubmit} className='form-container'>
            {/* Title of the form name  */}
            <h1>{name}</h1>    
            <input 
            className='form-input'
            type='text'
            // Dynamically changes from the user
            value={username}
            // Set the username as what the user has typed into the text field 
            onChange={(e) => setusername(e.target.value)}
            placeholder='Username'/> 

            <input 
            className='form-input'
            type='text'
            value={password}
            // Set the username as what the user has typed into the text field 
            onChange={(e) => setpassword(e.target.value)}
            placeholder='Password'/>   

            <button type='submit' className='form-button'>
                {name}
            </button>

        </form>
    </div>
  )
}

export default Form