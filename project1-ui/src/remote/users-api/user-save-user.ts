import { userClient } from "."
import { User } from "../../models/User"


export const userSaveUser = async (newUser:User) => {

    try{
        let response = await userClient.post('/signUp', newUser)
        console.log('in user-save-user')
        console.log(response)
        console.log(response.data)
        return response.data
    } catch(e){
        console.log(e)
    }
}