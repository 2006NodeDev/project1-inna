import axios from 'axios'
import { lbBaseUrl } from '../../environment'

export const userClient = axios.create({
    baseURL:lbBaseUrl,
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})