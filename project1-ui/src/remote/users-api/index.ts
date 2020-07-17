import axios from 'axios'

export const userClient = axios.create({
    baseURL:'http://localhost:2006',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})