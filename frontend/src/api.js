// Intercepter intercepts the request and handles the access token automatically

import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL       // Base URl,add the path to it 
})

// This intercepts the api request and checks the local storage to see if there is an access token
api.interceptors.request.use(
    (config) => {
        // Take the item with the key token from localstorage 
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    // Handle it but if there is an error the user should know about it
    (error) => {
        return Promise.reject(error)
    }
)

export default api