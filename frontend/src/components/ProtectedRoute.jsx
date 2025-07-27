import React from 'react'

// Protected Route you need an authorisation token to access 
import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'
import { useState, useEffect } from 'react'

function ProtectedRoute({children}) {
    const [isAuthorized, setisAuthorized] = useState(null)

    // As soon as the route is called then immediatly check authentication, else if refreshes the token
    useEffect(() => {
      auth().catch(() => setisAuthorized(false))
    }, [])
    

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const response = await api.post("/api/token/refresh/",{refresh: refreshToken,})
            if (response.status === 200) {      // If a success
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setisAuthorized(true)
            } else {
                setisAuthorized(false)
            }

            
        } catch (error) {
            setisAuthorized(false)
            console.log(error)
        }
    }

    // Check for access token, if we have one check if also expired and refresh
    // Otherwise login again
    const auth = async () => {
         const token = localStorage.getItem(ACCESS_TOKEN)

        //  Ensure that you have a token
         if (!token) {
            setisAuthorized(false)
            return
         }


         const decoded = jwtDecode(token)           // Decode the jwt token
         const tokenExpiration = decoded.exp        // Take Expiration time of the token (Seconds)
         const now = Date.now() / 1000              // Take the current time (Seconds)

         if (tokenExpiration < now ) {              // If the now is greater than exp time then expired
            await refreshToken()
         } else {
            setisAuthorized(true)
         }
        
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    // Check whether isAuthorized, if it is then return the children otherwise change the url to login 
    // The children will be components wrapped in a protected route
    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute