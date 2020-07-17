import { userClient } from "."
import { User } from "../../models/User"


export const userLogin = async (username:string, password:string) => {
    let credentials = {
        username, 
        password
    }
    try{
        let response = await userClient.post('/login', credentials)
        console.log(response)
        return response.data
    } catch(e){
        console.log(e)
    }
}