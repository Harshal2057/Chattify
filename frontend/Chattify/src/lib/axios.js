import axios from "axios"

export const axiosInstace = axios.create({
    baseURL:"http://localhost:4000/api",
    withCredentials:true
})