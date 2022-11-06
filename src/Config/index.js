import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000/api'
const token = JSON.parse(localStorage.getItem('token'));
export default axios.create({
    baseURL: BASE_URL
})


export const privateRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`

    },
    withCredentials: true
})
