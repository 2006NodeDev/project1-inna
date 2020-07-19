import { Role } from "../models/Role"

export class UserDTO {
    user_id: number
    username: string 
    password: string 
    first_name: string 
    last_name: string 
    email: string 
    role: Role
    role_id: number
    image?:string
}
