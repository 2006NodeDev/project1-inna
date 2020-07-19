import { userClient } from "."
import { User } from "../../models/User"


export const userUpdateUser = async (updateUser:User) => {

    try{
        let response = await userClient.patch('/users', updateUser)
        console.log('in user-update-user')
        console.log(response)
        console.log(response.data)
        return response.data
    } catch(e){
        console.log(e)
    }
}