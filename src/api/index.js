import axios from "axios";

export const API =axios.create(
    {
        baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
        headers: {
            "Content-Type": 'application/json'
        }
    }
)