import { userClient } from "."
import { User } from "../../models/User"


export const userSaveUser = async (newUser:User) => {

    try{
        let response = await userClient.post('/users', newUser)
        console.log(response)
        return response.data
    } catch(e){
        console.log(e)
    }
}